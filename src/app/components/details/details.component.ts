import { LoaderService } from './../../services/loader.service';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "../loader/loader.component";
import { LoaderDirective } from '../../directives/loader.directive';
@Component({
    selector: 'app-details',
    standalone: true,
    template: `
    <app-loader *hidden="loaderService.isLoad | async" ></app-loader>
    <h1 class="error" *ngIf='this.error'>Sorry, Something Goes Wrong !</h1>
    <section *ngIf='this.product'>
      <div class="image-wrap">
      <img
        id="product"
        [src]="product.image"
        alt="the product image"
        width="300"
        height="300"
        />
      </div>
      <div class="product-info">
        <h1 class='product-title'>{{product.title}}</h1>
        <table>
          <tr>
            <th>category</th>
            <td>{{product.category}}</td>
          </tr>
          <tr>
            <th>description</th>
            <td>{{product.description}}</td>
          </tr>
          <tr>
            <th>rate</th>
            <td>{{product.rating.rate}}</td>
          </tr>
          <tr>
            <th>count</th>
            <td>{{product.rating.count}}</td>
          </tr>
        </table>
      </div>
    </section>
  `,
    styleUrl: './details.component.css',
    imports: [CommonModule, LoaderComponent, LoaderDirective]
})
export class DetailsComponent implements OnDestroy{
  url = inject(ActivatedRoute);
  productService = inject(ProductService);
  loaderService = inject(LoaderService);

  productId : string;
  product! : Product;
  error : string = '';

  product$!: any;

  constructor(){
    this.productId = this.url.snapshot.paramMap.get('id')!;
    this.product$ = this.productService.getProductById(this.productId).subscribe({ next : value => {this.product = value},
    error : error => {
      console.error(error);
      this.error = error;
    }});
  }
  ngOnDestroy(): void {
    this.product$.unsubscribe()
  }
}
