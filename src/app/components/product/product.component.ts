import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule, RouterOutlet],
  template: `
    <section class="product" *ngIf="product">
      <div class="product-container">
        <div class="product-wrap">
          <div class="product-link" routerLink='details/{{product.id}}'>
            <h4 class="product-title">{{ product.title }}</h4>
            <p class="product-category">
              <span>Category: </span>{{ product.category }}
            </p>
            <hr />
            <img
              id="product"
              [src]="product.image"
              alt="the product image"
              width="200"
              height="200"
            />
            <hr />
            <p class="product-description">{{ product.description }}</p>
          </div>
          <div class="price-count-rate">
            <div class="price-purshes">
              <p id="price"><span>Price: </span>{{ product.price }}$</p>
              <button mat-stroked-button (click)="this.addToCart()">add to cart</button>
            </div>
            <div class="count-rate">
              <p id="count"><span>Count: </span>{{ product.rating.count }}</p>
              <p id="rate">
                {{ product.rating.rate }}
                <img src="assets/heart.svg" alt="heart icon" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product: Product | null = null;

  @Output('addtocart') e = new EventEmitter();

  addToCart() : void {
    this.e.emit(this.product);
  }
}
