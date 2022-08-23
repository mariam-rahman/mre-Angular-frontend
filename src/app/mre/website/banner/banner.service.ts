import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root' 
})
export class BannerService {

private baseUrl = 'api/banner';

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get(`${this.baseUrl}/list`)
  }

  add(data){
    return this.http.post(`${this.baseUrl}/add`,data)
  }

delete(id){
  return this.http.delete(`${this.baseUrl}/delete/${id}`);
}

getDataToEdit(id){
  return this.http.get(`${this.baseUrl}/getData/${id}`);
}

update(id,data){  
return this.http.put(`${this.baseUrl}/${id}/update`,data);
}


}


