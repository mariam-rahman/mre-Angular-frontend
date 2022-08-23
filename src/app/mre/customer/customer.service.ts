import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = "/api/customer";

  constructor(
    private http:HttpClient,
  ) { }

  list(){
    return this.http.get(`${this.baseUrl}/list`);
  }

  add(data){
   return this.http.post(`${this.baseUrl}/add`,data);
  }

  customerDetails(id){
    return this.http.get(`${this.baseUrl}/customer-details/${id}`);
  }

  customerDebt(id){
    return this.http.get(`${this.baseUrl}/customer-debt/${id}`);
  }

  editCustomer(id){
    return this.http.get(`${this.baseUrl}/customeredit/${id}`);
  }

  updateCustomer(data){
    return this.http.post(`${this.baseUrl}/updatecustomer`,data);
  }

  debtDetails(id){
    return this.http.get(`${this.baseUrl}/debtdetails/${id}`);
  }

  pay(data){
    return this.http.post(`${this.baseUrl}/pay`,data);
  }

}
