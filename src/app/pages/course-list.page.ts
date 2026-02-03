import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ContentService } from '../services/content.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  templateUrl: './course-list.page.html',
})
export class CourseListPage {
  private content = inject(ContentService);
  index$ = this.content.getIndex();
}
