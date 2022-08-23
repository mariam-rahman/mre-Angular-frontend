import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SummaryService {



  constructor(private http:HttpClient) { }

  getCounts(){
    return this.http.get('/api/summary/counts');
  }
 
  getChart(yr)
  {
    return this.http.get(`api/summary/chart/${yr}`);
  }

  getDate(){
    return this.http.get('api/summary/date');
  }
 
}
