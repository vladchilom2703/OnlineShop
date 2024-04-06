// src/app/shopping-cart/shopping-cart.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Product } from '../product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Product[] = [];
  cartTotal: number = 0;

  constructor(private cartService: ShoppingCartService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cartService.getTotalObservable().subscribe((total) => {
      this.cartTotal = total;
      this.cdr.detectChanges();
    });

    this.updateCart();
  }

  updateCart(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  checkout(): void {
    this.cartService.clearCart();
    this.updateCart();
  }
}
