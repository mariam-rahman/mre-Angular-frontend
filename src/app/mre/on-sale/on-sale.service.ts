import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnSaleService {
  private baseUrl = "/api/onsales";

  constructor(private http:HttpClient)
   { }


  list(data,filters){
    return this.http.post(`${this.baseUrl}/list`,{data,filters})
  }

  OnSaleDetails(id){
    return this.http.get(`${this.baseUrl}/${id}/OnSaleDetails/`);
  }
}
