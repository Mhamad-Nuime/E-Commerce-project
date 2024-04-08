import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  template: `
    <section class="product">
      <div class="product-container">
      <div class="product-wrap">
        <h4 class="product-title">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</h4>
        <hr>
        <p class="product-category"><span>Category: </span>men's clothing</p>
        <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="the product image" width='200' height='200'>
        <hr>
        <p class="product-description">Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday</p>
        <div class="price-count-rate">
          <p><span>Price: </span>109.95$</p>
          <div class="count-rate">
          <p id="count"><span>Count: </span>104</p>
            <p id="rate">3.9
              <img src="assets/heart.svg" alt="heart icon">
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  `,
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
