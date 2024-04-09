import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main>
      <section class="filter">
        <label for="categories">Cotegories
          <select name="categories" id="categories" [(ngModel)]='this.selectedCategory' (ngModelChange)="this.ngOnInit()">
              <option [value]="category" *ngFor="let category of this.categories">{{category}}</option>
          </select>
        </label>
      </section>
      <div class="products-list-container" onload="">
        <!-- <section class="product" *ngFor="let p of this.products">
        <div class="product-container">
        <div class="product-wrap">
          <h4 class="product-title">{{p.title}}</h4>
          <p class="product-category"><span>Category: </span>{{p.category}}</p>
          <hr>
          <img [src]="p.image" alt="the product image" width='200' height='200'>
          <hr>
          <p class="product-description">{{p.description}}</p>
          <div class="price-count-rate">
            <p><span>Price: </span>{{p.price}}</p>
            <div class="count-rate">
            <p id="count"><span>Count: </span>{{p.rating.count}}</p>
              <p id="rate">{{p.rating.rate}}
                <img src="assets/heart.svg" alt="heart icon">
              </p>
            </div>
          </div>
        </div>
        </div>
      </section> -->
      <section class="loading-spinner">
        <div class="spinner">
          <div class="ball 1"></div>
          <div class="ball 2"></div>
          <div class="ball 3"></div>
        </div>
      </section>
      </div>
    </main>
  `,
  styleUrl: './products.component.css',
  providers: [ProductService],
})
export class ProductsComponent implements OnInit,OnDestroy {
  products : any = null ;
  product$ : any = null;
  categories: string[]= ["All", "men's clothing", "women's clothing", "jewelery", "electronics"];
  selectedCategory: string = 'All';
  productService = inject(ProductService);
  ngOnInit(): void {
    if (this.selectedCategory == 'All'){
      this.product$ =this.getProducts().subscribe(value => {
        this.products = value;
      })
    } else {
      this.product$ = this.getProductsByCategory(this.selectedCategory).subscribe(value => {
        this.products = value;
      });
    }
  }
  ngOnDestroy(): void {
    this.product$.unsubscribe();
  }
  getProducts(){
    console.log('from component')
    return this.productService.getAllProduct();
  }
  getProductsByCategory(c : string){
    return this.productService.getProductsByCategory(c);
  }
  addCategory(c: string){
    this.categories.push(c);
    console.log(`"${c}" category has been added successfully`);
  }
}
