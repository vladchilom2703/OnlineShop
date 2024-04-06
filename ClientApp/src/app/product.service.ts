// src/app/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:44482/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<Product[]>(this.apiUrl, { headers })
      .pipe(
        catchError((error: any) => {
          console.error(error);
          throw error;
        })
      );
  }
}
export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  specifications: string;
  price: number;
}
