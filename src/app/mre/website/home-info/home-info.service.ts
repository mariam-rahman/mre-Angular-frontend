import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeInfoService {

  private baseUrl = 'api/homeinfo';

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get(`${this.baseUrl}/list`)
  }

 
delete(id){
  return this.http.delete(`${this.baseUrl}/delete/${id}`);
}

add(data){
return this.http.post(`${this.baseUrl}/add`,data);
}
}
