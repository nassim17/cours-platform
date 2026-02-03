import { Component, computed, inject, signal } from "@angular/core";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  NavigationEnd,
} from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  private router = inject(Router);

  // Détecte si on est sur la version EN (préfixe /en). FR = racine.
  private path = signal<string>(
    typeof window === "undefined" ? "/" : window.location.pathname,
  );

  isEn = computed(() => this.path().startsWith("/en/"));
  locale = computed<"fr" | "en">(() => (this.isEn() ? "en" : "fr"));

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.path.set(window.location.pathname));
  }

  /** Lien vers la page actuelle dans l'autre langue (best-effort, sans mapping fin par slug). */
  otherLocaleUrl(): string {
    const p = this.path();
    if (p.startsWith("/en/")) return p.replace(/^\/en\//, "/");
    if (p === "/en") return "/";
    return "/en" + (p.startsWith("/") ? p : "/" + p);
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
