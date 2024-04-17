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
  searchQuery: string = '';

  constructor(private productService: ProductService, private cartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products.sort((a, b) => a.category.localeCompare(b.category));
      this.groupedProducts = this.groupProductsByCategory(this.products);
    });
  }

  private groupProductsByCategory(products: Product[]): Product[][] {
    const categoriesMap: { [category: string]: Product[] } = {};

    // Initialize categoriesMap with empty arrays for each category
    products.forEach((product) => {
      if (!categoriesMap[product.category]) {
        categoriesMap[product.category] = [];
      }
    });

    // Populate categoriesMap with filtered products
    products.forEach((product) => {
      if (this.getFilteredProducts().includes(product)) {
        categoriesMap[product.category].push(product);
      }
    });

    // Convert categoriesMap to groupedProducts array
    return Object.values(categoriesMap);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    console.log('Product added to cart:', product);
  }

  getFilteredProducts(): Product[] {
    return this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
