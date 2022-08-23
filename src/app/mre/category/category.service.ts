import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CategoryService {

  private baseUrl = "/api/category";

  constructor(private http: HttpClient) {
  }

  list() {
    return this.http.get(`${this.baseUrl}`)
  
  }

  add(data: any) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getById(recordId){
    return this.http.get(`${this.baseUrl}/${recordId}`);
  }

  delete(id:any) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  update(id:number,data:any){
    return this.http.put(`${this.baseUrl}/${id}`,data);
  }


  
}
