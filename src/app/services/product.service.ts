import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http= inject(HttpClient);

  getAllProduct() {
    console.log('fetching all products');
    return this.http.get<Product[]>(environment.baseAPI +'products');
  }
  getProductsByCategory(category : string){
    console.log(`fetching products with category : ${category}`);
    return this.http.get<Product[]>(environment.baseAPI + 'products/category/'+ category);
  }
}
