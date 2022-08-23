import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private baseUrl = "/api/sale"
  constructor(
    private http:HttpClient,
  ) { }

  //operation os sale 
  list(data,filters){
    return this.http.post(`${this.baseUrl}/list`,{data,filters})
  }

  deleteSale(sale_id){
    return this.http.delete(`${this.baseUrl}/delete-sale/${sale_id}`);
  }

  saleDetails(id){
    return this.http.get(`${this.baseUrl}/sale-details/${id}`);
  }
  //end

  customerList(){
    return this.http.get(`${this.baseUrl}/customerList`);
  }

  add(data){
    return this.http.post(`${this.baseUrl}/add`,data);
  }

  saleForm(id){
    return this.http.get(`${this.baseUrl}/sell-product-list/${id}`);
  }

  getProduct(stockId){
    return this.http.get(`${this.baseUrl}/product-list/${stockId}`);
  }


  createSellProduct(data)
  {
    return this.http.post(`${this.baseUrl}/create-sell-product`,data);
  }

  addPayment(data){
    return this.http.post(`${this.baseUrl}/add-payment`,data);
  }

  //operation on sell to component
  deleteSellProduct(data){
    return this.http.post(`${this.baseUrl}/delete-sell-details`,data);
  }


  updateSellProduct(data){
    return this.http.post(`${this.baseUrl}/update-sell-product`,data);
  }

//end

printInvoice(id){
  return this.http.get(`${this.baseUrl}/print-invoice/${id}`);
}

}
