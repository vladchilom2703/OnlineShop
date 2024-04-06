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
  filteredProducts: Product[] = [];

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

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    console.log('Product added to cart:', product);
  }

  searchProducts(event: any): void {
    const keyword = event.target.value;
    if (!keyword.trim()) {
      this.filteredProducts = [];
    } else {
      this.filteredProducts = this.cartItems.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  }

  checkout(): void {
    this.cartService.clearCart();
    this.updateCart();
  }
}
