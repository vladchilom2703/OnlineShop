import { Injectable } from '@angular/core';
import { Product } from './product.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.cartItems);
  private totalSubject = new BehaviorSubject<number>(0);

  getCartItemsObservable() {
    return this.cartItemsSubject.asObservable();
  }

  getTotalObservable() {
    return this.totalSubject.asObservable();
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.cartItemsSubject.next([...this.cartItems]);

    this.calculateTotalAsync().then((total) => {
      this.totalSubject.next(total);
    });
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next([]);
    this.totalSubject.next(0);
  }

  async calculateTotalAsync(): Promise<number> {
    return new Promise((resolve) => {
      const total = this.cartItems.reduce((acc, item) => acc + item.price, 0);
      console.log('Cart total:', total);
      resolve(total);
    });
  }
}
