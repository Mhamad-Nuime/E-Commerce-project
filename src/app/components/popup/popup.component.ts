import { Product } from './../../interfaces/product';
import { Component, EventEmitter, Input, Output, OnChanges, AfterViewInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NumberOfCharecterDirective } from '../../directives/number-of-charecter.directive';
@Component({
  selector: 'pop-up',
  standalone: true,
  imports: [ReactiveFormsModule,
            NumberOfCharecterDirective
            ],
  template: `
    <section class="popup-wrap">
      <div class="close-button-wrap">
        <button type="button" id='close-button' (click)="this.hideMe()">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
        </button>
      </div>
      <h3 class="popup-title">Select The Product's Quantity You Want</h3>
      <div class="popup-content">
        <div class="cart-operation">
          <table>
            <thead>
              <th>Product</th>
              <th>Quantity Available</th>
              <th>price</th>
              <th>Quantity</th>
              <th>Total</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    [src]="product.image"
                    alt="product's image"
                    width="150"
                    height="150"
                  />
                </td>
                <td>
                  {{ product.rating.count }}
                </td>
                <td>
                  {{ product.price }}$
                </td>
                <td id='quantity-operations'>
                  <button
                    type="button"
                    id="increase"
                    (click)="this.increaseQuantity()"
                  >
                    +
                  </button>
                  <input
                    type="text"
                    id="quantity-field"
                    name="quantity"
                    size="8"
                    placeholder="0"
                    [numberOfCharecter]='((this.product.rating.count).toString()).length'
                    [formControl]="this.quantity"
                    (ngModelChange)="this.quantityValueCheckIfHasAlphaCharecters()"
                    />
                  <button
                    type="button"
                    id="increase"
                    (click)="this.decreaseQuantity()"
                  >
                    -
                  </button>
                </td>
                <td>
                  {{ this.calcTotal(this.product.price)}}$
                </td>
              </tr>
            </tbody>
          </table>
          <div class="conform-button-wrap">
            <button type="button" id='conform-button'>Conform</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './popup.component.css',
})
export class PopUpComponent implements AfterViewInit{
  @Input('passedProduct') product!: Product;

  @Output() hide = new EventEmitter();

  quantity : FormControl;

  total : number;

constructor(){
  this.quantity = new FormControl<string>(
    '',
    [ Validators.pattern(/^[0-9]{1,4}$/),
      Validators.min(1),
    ]
  );
  this.total = 0;
}
  ngAfterViewInit(): void {
    this.quantity.addValidators(Validators.max(this.product.rating.count));
  }

  increaseQuantity(): void {
    if (this.quantity.value == '') { this.quantity.setValue('0');}
    this.quantity.setValue((parseInt(this.quantity.value) + 1).toString());
    this.quantity.markAsDirty();
    this.quantity.markAsTouched();
  }
  decreaseQuantity(): void {
    if (parseInt(this.quantity.value ) > 0) {
    this.quantity.setValue((parseInt(this.quantity.value) - 1).toString());
    this.quantity.markAsDirty();
    this.quantity.markAsTouched();
    }
  }
  calcTotal(price : number) {
    let quantity = parseInt(this.quantity.value);
    if (quantity){
    let totalInFloat : number = quantity * price ;
    let totalInInteger : number = Math.trunc(totalInFloat);
    console.log(totalInFloat, totalInInteger, totalInFloat === totalInInteger);
    return (totalInFloat === totalInInteger) ? totalInInteger : parseFloat((totalInFloat).toFixed(2));
    } else {
      return 0 ;
    }
  }
  quantityValueCheckIfHasAlphaCharecters() : void {
    if (parseInt(this.quantity.value) < 0 || isNaN(this.quantity.value)){
      this.quantity.setValue('');
    }
    if (/[A-Za-z]/.test(this.quantity.value)){
      this.quantity.setValue(this.quantity.value.replace(/[A-Za-z]/, ''));
    }
  }
  hideMe() : void {
    this.hide.emit();
  }
}
