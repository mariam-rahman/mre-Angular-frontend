import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WebCategoryService {

 private baseUrl = 'api/webcategory'

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get(`${this.baseUrl}/list`);
  }

  add(data){
    return this.http.post(`${this.baseUrl}/addwebcategory`,data);
  }

  delete(id){
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

}
