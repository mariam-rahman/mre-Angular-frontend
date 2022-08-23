import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {


    private baseUrl = '/api/users';
    constructor(private http: HttpClient) { }

    updateUserPassword(password) {
        return this.http.put(`${this.baseUrl}/cpassword`, {}, {
            params: {
                currentPassword: password.currentPassword,
                newPassword: password.newPassword
            }
        });
    }

    updateOdkUserPassword(password) {
        return this.http.put(`${this.baseUrl}/change-odk-password`, {}, {
            params: {
                currentPassword: password.oldPassword,
                newPassword: password.newPassword
            }
        });
    }

    getUsersList(): Observable<any> {
        return this.http.get<Array<any>>(`${this.baseUrl}`);
    }
    getUser(id: number): Observable<Object> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    createUser(data): Observable<any> {
 
        return this.http.post(`${this.baseUrl}`, data);
    }

    updateUser(id: number, data: any): Observable<Object> {
        console.log("value of users", data);
        
        return this.http.put(`${this.baseUrl}/update/${id}`, data);
        
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }

    updateUserInfo(id: number, data: any) {
        return this.http.put(`${this.baseUrl}/profile/${id}`, data);
    }
    updatePreferences(data) {
        return this.http.put(`${this.baseUrl}/preferences`, data)
    }

    addExistingUserToEnvironment(id, body) {
        return this.http.put(`${this.baseUrl}/${id}/new-env`, body);
    }

    getLoggedInUserGroups(): Observable<any> {
        return this.http.get(`${this.baseUrl}/loggedin-user/groups`);
    }
    /**
	 * fech necessary info to create a new user
     * it includes groups, jobs 
	 * @Author Jalil Haidari
	 * @returns Observable of the response object
	 */
    getRequiredInfoToCreateNewUser(): Observable<any> {
        return this.http.get(`${this.baseUrl}/creation-data`);
    }

    getUserByUsername(username: string, envSlug) {
        return this.http.get(`${this.baseUrl}/one`, {
            params: { envSlug, username }
        });
    }

    uploadPhoto(data): Observable<HttpEvent<any>> {
        const req = new HttpRequest('POST', `${this.baseUrl}/upload-image`, data, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }

    //users for Dashboard
    getuserstotal(){
       return this.http.get(`${this.baseUrl}/getuserstotal`);
    }

}
