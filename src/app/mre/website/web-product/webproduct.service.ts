import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebproductService {

  private baseUrl = 'api/webproduct';

  constructor(private http:HttpClient) { }


  list(){
return this.http.get(`${this.baseUrl}/list`);
  }

  add(data){
    return this.http.post(`${this.baseUrl}/add`,data)
  }

  delete(id){
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

}
