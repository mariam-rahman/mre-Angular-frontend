import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = "/api/employee";
  constructor(private http:HttpClient) { }


  list(){
    return this.http.get(`api/employee/list`);
  }

  add(data){
    return this.http.post(`${this.baseUrl}/add`,data);
  }
  showEmployee(id){
    return this.http.get(`${this.baseUrl}/${id}/showEmployee`);
  }
promotion(id){
  return this.http.get(`${this.baseUrl}/${id}/promotion`);
}

addpromotion(data:any){
  return this.http.post(`${this.baseUrl}/addPromotion`,data);
}

editPromotion(id){
  return this.http.get(`${this.baseUrl}/${id}/editPromotion`);
}

storePromotion(data:any){
  return this.http.post(`${this.baseUrl}/updatePromotion`,data);
}

deleteEmployee(id){
  return this.http.delete(`${this.baseUrl}/${id}/deleteEmployee`);
}

employeeEdit(id){
 return this.http.get(`${this.baseUrl}/${id}/editEmployee`);
}

employeeUpdate(id,data:any){
  return this.http.post(`${this.baseUrl}/${id}/employeeUpdate`,data);
}


//for dashboard
getemployee(){
  return this.http.get(`${this.baseUrl}/getemployee`);
}

//for salary 
salary(id){
  return this.http.get(`${this.baseUrl}/getsalary/${id}`);
}

employeeDetails(id){
  return this.http.get(`${this.baseUrl}/getemp/${id}`);
}

addSalary(data){
  return this.http.post(`${this.baseUrl}/addsalary`,data);
}


}
