import { inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';

export interface LessonRef {
  slug: string;
  title: string;
  summary: string;
  file: string; // path relative to assets (e.g. "content/fr/spring-boot/transactions-intro.md")
}

export interface CourseRef {
  id: string;
  title: string;
  description: string;
  lessons: LessonRef[];
}

export interface ContentIndex {
  courses: CourseRef[];
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);
  private localeId = inject(LOCALE_ID);

  readonly locale: 'fr' | 'en' = (this.localeId || 'fr').toString().startsWith('en') ? 'en' : 'fr';

  private index$?: Observable<ContentIndex>;

  getIndex(): Observable<ContentIndex> {
    if (!this.index$) {
      // Les 2 langues sont packagées comme assets; on lit l'index de la langue courante.
      this.index$ = this.http
        .get<ContentIndex>(`assets/content/${this.locale}/index.json`)
        .pipe(shareReplay({ bufferSize: 1, refCount: true }));
    }
    return this.index$;
  }

  getCourse(courseId: string): Observable<CourseRef | undefined> {
    return this.getIndex().pipe(map((idx) => idx.courses.find((c) => c.id === courseId)));
  }

  getLesson(courseId: string, lessonSlug: string): Observable<LessonRef | undefined> {
    return this.getCourse(courseId).pipe(map((c) => c?.lessons.find((l) => l.slug === lessonSlug)));
  }

  getLessonMarkdown(lesson: LessonRef): Observable<string> {
    // lesson.file est un chemin relatif sous assets/
    return this.http.get(`assets/${lesson.file}`, { responseType: 'text' });
  }
}
