import { Routes } from '@angular/router';
import { HomePage } from './pages/home.page';
import { CourseListPage } from './pages/course-list.page';
import { LessonPage } from './pages/lesson.page';
import { NotFoundPage } from './pages/not-found.page';

export const routes: Routes = [
  { path: '', component: HomePage, pathMatch: 'full' },
  { path: 'courses', component: CourseListPage },
  { path: 'courses/:courseId/:lessonSlug', component: LessonPage },
  { path: '**', component: NotFoundPage },
];
