import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http= inject(HttpClient);

  getAllProduct() {
    console.log('fetching all products');
    return this.http.get('https://fakestoreapi.com/products');
  }
  getProductsWithCategory(category : string){
    console.log(`fetching products with category : ${category}`);
    return this.http.get('https://fakestoreapi.com/products/category/'.concat(category));
  }
}
