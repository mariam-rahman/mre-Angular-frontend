import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebpageService { 

  private baseUrl = "/api/webpage";

  constructor(private http: HttpClient) {
  }

  listSliderTitles(){
    return this.http.get(`${this.baseUrl}/bannerlist`);
  }

  bannerList()
  {
    return this.http.get(`/api/category`)
  }

  categorylist(){
    return this.http.get(`${this.baseUrl}/categorylist`);
  }

  productlist(){
    return this.http.get(`${this.baseUrl}/productlist`);
  }

  homeInfoList(){
    return this.http.get(`${this.baseUrl}/homeinfolist`);
  }

  filter(id){
    return this.http.get(`${this.baseUrl}/filter/${id}`);
  }

  categoryfiltters(id){
    return this.http.get(`${this.baseUrl}/category-filter/${id}`);
  }

}
