import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductComponent } from '../product/product.component';
import { LoaderComponent } from '../loader/loader.component';
import { Product } from '../../interfaces/product';
import { LoaderDirective } from '../../directives/loader.directive';
import { LoaderService } from '../../services/loader.service';
import {MatSelectModule} from '@angular/material/select';
import { PopUpComponent } from '../popup/popup.component';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductComponent,PopUpComponent, LoaderComponent,LoaderDirective, MatSelectModule],
  template: `
    <main>
      <section class="filter">
        <label for="categories">Cotegories</label>
        <mat-select name="categories" id="categories" [(ngModel)]='this.selectedCategory' (ngModelChange)="this.ngOnInit()">
            <mat-option [value]="category" *ngFor="let category of this.categories">{{category}}</mat-option>
        </mat-select>
      </section>
      <div>
        <app-loader *hidden="loaderService.isLoad | async" ></app-loader>
      </div>
      <div class="products-list-container">
        <app-product *ngFor="let product of this.products" [product]='product' (addtocart)="this.showPopup($event)"></app-product>
        <h1 class="error" *ngIf='this.error'>Sorry, Something Goes Wrong !</h1>
      </div>
      <div class="popup-wrap" *ngIf='this.show'>
        <pop-up [passedProduct]="this.product" (hide)="this.hidePopup()"></pop-up>
      </div>
    </main>
    `,
  styleUrl: './products.component.css',
  providers: [],
})
export class ProductsComponent implements OnInit, OnDestroy {
  product! : Product;
  products : Product[] = [] ;
  error : string = '';

  selectedCategory: string = 'All';
  categories: string[]= ["All", "men's clothing", "women's clothing", "jewelery", "electronics"];

  product$ : any = null;

  show : Boolean = false ;

  loaderService= inject(LoaderService);
  productService = inject(ProductService);

  ngOnInit(): void {
    if (this.selectedCategory == 'All'){
      this.product$ =this.getProducts().subscribe({next : value => {
        this.products = value;
      },
      error : error => {
        console.error(error);
        this.error = error;
      }})
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

  showPopup(p : Product) : void {
    this.product = p;
    document.body.classList.add('popup-open');
    this.show = true;
    console.log(`pop up window is shown successfuly` , p);
  }
  hidePopup() : void {
    document.body.classList.remove('popup-open');
    this.show = false;
    console.log(`pop up window is hiddent successfuly`);
  }
}
