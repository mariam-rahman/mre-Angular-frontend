import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SubStockService {

  private baseUrl = "/api/substock/";
  constructor(private http:HttpClient) { }


  list(data,filters){
    return this.http.post(`${this.baseUrl}/list`,{data,filters})
  }

  subDetails(id){
    return this.http.get(`${this.baseUrl}/details/${id}`);
  }
  
  moveToOnSale(data){
    return this.http.post(`${this.baseUrl}/moveOnSale`,data);
  }

  restoreData(data){
    return this.http.post(`${this.baseUrl}/restoreData`,data);
  }
}
