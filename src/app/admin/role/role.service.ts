import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Role} from "./role";
 
@Injectable({
	providedIn: 'root'
})
export class RoleService {

	// private baseUrl = environment.apiUrl;
	private baseUrl = '/api/access';
	

	constructor(private http: HttpClient) { }

	getPermissionsList(): Observable<any> {
		return this.http.get(`${this.baseUrl}/permissions/list`);
	}

	getRolesList(): Observable<any> {
		return this.http.get(`${this.baseUrl}/roles/list`);
	}
 
	getRole(id: number): Observable<Object> {
		return this.http.get(`${this.baseUrl}/role/edit/${id}`);
	}

	createRole(obj: Object): Observable<Object> {

		return this.http.post(`${this.baseUrl}/roles/create`, obj);
	}

	updateRole(id: number, value: Role): Observable<Object> {
	 console.log("in the update method the role is:"+JSON.stringify(value));
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	deleteRole(id: number): Observable<any> {
		return this.http.delete(`${this.baseUrl}/role/delete/${id}`);
	}

	getPermission(id){
		return this.http.get(`${this.baseUrl}/permission/${id}`);
	}


}
