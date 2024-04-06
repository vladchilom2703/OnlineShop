// src/app/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  groupedProducts: Product[][] = [];

  constructor(private productService: ProductService, private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products.sort((a, b) => a.category.localeCompare(b.category));
      this.groupedProducts = this.groupProductsByCategory(this.products);
    });
  }

  private groupProductsByCategory(products: Product[]): Product[][] {
    const groupedProducts: Product[][] = [];
    let currentCategory: string;

    products.forEach((product) => {
      if (product.category !== currentCategory) {
        currentCategory = product.category;
        groupedProducts.push([product]);
      } else {
        groupedProducts[groupedProducts.length - 1].push(product);
      }
    });

    return groupedProducts;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    console.log('Product added to cart:', product);
  }

}
