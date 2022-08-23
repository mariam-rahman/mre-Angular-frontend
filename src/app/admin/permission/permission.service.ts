import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
	providedIn: 'root'
})
export class PermissionService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/access/';


	constructor(private http: HttpClient) { }


	getPermissionsList(): Observable<any> {
		return this.http.get(`${this.baseUrl}/permissions/list`);
	}

	addPermission(data){
		return this.http.post(`${this.baseUrl}permission/add`,data);
	}

	deletePermission(id){
		return this.http.delete(`${this.baseUrl}permission/delete/${id}`);
	}

	getpermissionForEdit(id){
		return this.http.get(`${this.baseUrl}edit/permission/${id}`);
	}

	updatePermission(id,data){
		return this.http.post(`${this.baseUrl}/update/permission/${id}`,data);
	}



}