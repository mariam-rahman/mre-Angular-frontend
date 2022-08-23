import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  private baseUrl = "/api/webproduct";

  constructor(private http: HttpClient) {
  }

  categoryfiltters(id){
    return this.http.get(`${this.baseUrl}/categoryFilter/${id}`);
  }
  
}
