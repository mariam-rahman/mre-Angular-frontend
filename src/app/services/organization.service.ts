import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
    private baseUrl = '/api/admin/organizations';

      constructor(private http: HttpClient) { }

      getOrganizations(): Observable<any> {
        return this.http.get(`${this.baseUrl}`);
      }



      getOrganizationById(id: number): Observable<Object> {
        return this.http.get(`${this.baseUrl}/${id}`);
      }

    
      deleteRecord(id){
        return this.http.delete(`${this.baseUrl}/${id}`);
      }

      getRecordList(data, filters) {
        return this.http.post(`${this.baseUrl}`, {
          input: data,
          filters: filters
        });
      }

}
