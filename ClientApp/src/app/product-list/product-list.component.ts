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
    const groupedProducts: Product[][] = [];
    const categoriesSet = new Set<string>();

    products.forEach((product) => {
      if (!categoriesSet.has(product.category)) {
        categoriesSet.add(product.category);
        const categoryProducts = products.filter(p => p.category === product.category);
        groupedProducts.push(categoryProducts);
      }
    });

    return groupedProducts;
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    console.log('Product added to cart:', product);
  }

  getFilteredProducts(): Product[] {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
