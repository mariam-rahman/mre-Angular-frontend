import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainStockService {

  private baseUrl = "/api/mainStock";
  
  constructor(private http:HttpClient) { }

  list(data,filters){
    return this.http.post(`${this.baseUrl}/list`,{data,filters})
  }

  details(id){
    return this.http.get(`${this.baseUrl}/${id}/details`);
  }

  moveToSub(data:any){
    return this.http.post(`${this.baseUrl}/move-to-sub`,data);
  }
  moveOnSale(data){
    return this.http.post(`${this.baseUrl}/moveOnSsale`,data);
  }

}
