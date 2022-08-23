import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DownloadServiceService {

  baseUrl = "api/download";

  constructor(private http: HttpClient) { }

  getSales(data) {
    return this.http.post(`${this.baseUrl}/sale`, data);
  }


  getProducts(data)
  {
    return this.http.post(`${this.baseUrl}/product`, data);
  }
}
