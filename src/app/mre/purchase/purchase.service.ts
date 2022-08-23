import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl = "/api/purchase";

  
  constructor(
    private http:HttpClient
  ) { }

  list(data,filters){
    return this.http.post(`${this.baseUrl}/list`,{data,filters})
  }
  add(data:any){
    return this.http.post(`api/purchase-create`,data);
     
   }
 
   show(id){
     return this.http.get(`${this.baseUrl}/${id}`);
   }
 
   getById(recordId){
     return this.http.get(`${this.baseUrl}/${recordId}/edit`);
   }
 
   update(id,data){
     return this.http.put(`${this.baseUrl}/${id}/update`,data);
   }
 
   delete(id){
     return this.http.delete(`${this.baseUrl}/${id}/delete`);
   }
}
