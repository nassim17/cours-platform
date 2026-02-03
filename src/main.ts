import { provideZonelessChangeDetection } from "@angular/core";
import { provideRouter, withInMemoryScrolling } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";

import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { bootstrapApplication } from "@angular/platform-browser";

bootstrapApplication(AppComponent, {
  providers: [
    // Angular 21: zoneless par défaut sur les nouvelles apps, mais on explicite pour éviter les surprises.
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: "enabled",
        anchorScrolling: "enabled",
      }),
    ),
  ],
}).catch((err) => console.error(err));
