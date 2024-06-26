import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <header>
      <div aria-label="logo">
        <img src="assets/logo.svg" alt="the website logo" width="40" height="40">
        <h1 class="website-name dancing-script">Coolness</h1>
      </div>
      <nav>
        <ul>
          <li routerLink="products" routerLinkActive="active">products</li>
          <li routerLink="carts"
          routerLinkActive="active">carts</li>
        </ul>
      </nav>
    </header>
    <main class="page-wrap">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-Commerce';
}
