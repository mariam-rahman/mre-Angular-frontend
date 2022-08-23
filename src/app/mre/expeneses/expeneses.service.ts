import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenesesService {

  private baseUrl = "/api/expense";
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${this.baseUrl}/list`);
  }

  add(data) {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  delete(id) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  update(id, data) {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }

  childAdd(data) {
    return this.http.post(`${this.baseUrl}/child/add`, data);
  }
  childUpdate(data,id) {
    return this.http.put(`${this.baseUrl}/child/update/${id}`, data);
  }
  ChildList(data, filters, id) {
    return this.http.post(`${this.baseUrl}/child/list/${id}`, { data, filters });
  }

  childDelete(id) {
    return this.http.delete(`${this.baseUrl}/child/delete/${id}`);
  }


}
