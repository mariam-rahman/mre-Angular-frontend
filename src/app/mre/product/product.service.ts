import { Injectable } from '@angular/core';
import { database } from 'firebase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

private baseUrl = "/api/product";

  constructor(private http:HttpClient)
   { }


  list(data,filters){
    return this.http.post(`${this.baseUrl}/list`,{data,filters})
  }

  add(data:any){
   return this.http.post(`${this.baseUrl}/add`,data);
    
  }

  show(id){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getById(recordId){
    return this.http.get(`${this.baseUrl}/${recordId}/edit`);
  }

  update(data){
    return this.http.put(`${this.baseUrl}/update`,data);
  }

  delete(id){
    return this.http.delete(`${this.baseUrl}/${id}/delete`);
  }

  productList(){
    return this.http.get(`api/product-list`);
  }


}
