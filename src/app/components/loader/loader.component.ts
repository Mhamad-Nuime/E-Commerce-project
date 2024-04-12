import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="loading-spinner appear ">
        <div class="spinner">
          <div class="ball 1"></div>
          <div class="ball 2"></div>
          <div class="ball 3"></div>
        </div>
      </section>
  `,
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
}
