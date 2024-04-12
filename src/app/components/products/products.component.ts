import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';
import { LoaderComponent } from '../loader/loader.component';
import { Product } from '../../interfaces/product';
import { LoaderDirective } from '../../directives/loader.directive';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductComponent, LoaderComponent,LoaderDirective],
  template: `
    <main>
      <section class="filter">
        <label for="categories">Cotegories</label>
        <select name="categories" id="categories" [(ngModel)]='this.selectedCategory' (ngModelChange)="this.ngOnInit()">
            <option [value]="category" *ngFor="let category of this.categories">{{category}}</option>
        </select>
      </section>
      <app-loader *hidden="loaderService.isLoad | async" ></app-loader>
      <div class="products-list-container">
        <app-product *ngFor="let product of this.products" [product]='product'></app-product>
      </div>
    </main>
  `,
  styleUrl: './products.component.css',
  providers: [],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products : Product[] = [] ;
  product$ : any = null;
  loaderService= inject(LoaderService);
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
    return this.productService.getAllProduct();
  }
  getProductsByCategory(c : string){
    return this.productService.getProductsByCategory(c);
  }
}
