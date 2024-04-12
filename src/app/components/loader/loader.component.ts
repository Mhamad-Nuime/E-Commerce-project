import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="loading-spinner appear " *ngIf='this.loaderService.isLoad | async'>
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
  loaderService= inject(LoaderService);
}
