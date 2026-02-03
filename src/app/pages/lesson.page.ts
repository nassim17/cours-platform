import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { combineLatest, map, switchMap } from 'rxjs';
import { marked } from 'marked';
import { ContentService } from '../services/content.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './lesson.page.html',
})
export class LessonPage {
  private route = inject(ActivatedRoute);
  private content = inject(ContentService);
  private sanitizer = inject(DomSanitizer);
  private title = inject(Title);

  vm$ = combineLatest([
    this.route.paramMap.pipe(map((p) => ({ courseId: p.get('courseId')!, lessonSlug: p.get('lessonSlug')! }))),
    this.content.getIndex(),
  ]).pipe(
    switchMap(([params, idx]) => {
      const course = idx.courses.find((c) => c.id === params.courseId);
      const lesson = course?.lessons.find((l) => l.slug === params.lessonSlug);
      if (!course || !lesson) {
        return [ { course: undefined, lesson: undefined, html: this.sanitizer.bypassSecurityTrustHtml('') } ] as any;
      }
      return this.content.getLessonMarkdown(lesson).pipe(
        map((md) => {
          const rawHtml = marked.parse(md) as string;
          const html: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
          this.title.setTitle(`${lesson.title} — ${course.title}`);
          return { course, lesson, html };
        }),
      );
    }),
  );
}
