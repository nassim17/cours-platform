import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../services/content.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.page.html',
})
export class HomePage {
  content = inject(ContentService);
}
