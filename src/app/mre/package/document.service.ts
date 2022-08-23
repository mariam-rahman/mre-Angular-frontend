import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDownloadService } from 'app/services/file-download.service';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private baseUrl = '/api/packages';
  private baseUrlComment = '/api/taqnin/comments';
  private baseUrlAttachment = 'api/taqnin/document-attachments';
  constructor(private http: HttpClient, private fileDownloadService: FileDownloadService) { }

  getRecordList(data, filters) {
    console.log("data list ",data);
    
    return this.http.post(`${this.baseUrl}`, {
      input: data,
      filters: filters
    });
  }

  getLoadData() {
    return this.http.get(`${this.baseUrl}/load-data`);
  }


  addRecord(data) {
    return this.http.post(`${this.baseUrl}/store`, data, {
      reportProgress: true,
    });
  }

  editRecord(id, data) {
    return this.http.put(`${this.baseUrl}/update/${id}`, data, {
      reportProgress: true,
    });
  }



  getRecordById(id) {
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  getDocuementDtoById(id) {
    return this.http.get(`${this.baseUrl}/document-dto/${id}`);
  }

  approveDocument(data) {
    console.log("approve", data);
    
    return this.http.put(`${this.baseUrl}/approve`,data);
  }

  assignDocument(id, data) {
    return this.http.post(`${this.baseUrl}/assign/${id}`, data, {
      reportProgress: true,
    });
  }

  documentCompletion(id, data) {
    return this.http.put(`${this.baseUrl}/document-completion/${id}`, data);
  }

  // downloadAttachment(attachmentId, documentId) {
  //   this.fileDownloadService.download(`/api/taqnin/document-attachments/downloadFile/${attachmentId}/${documentId}`, 'GET');
  // }

  downloadAttachment(documentId) {
    var res = this.http.get(`${this.baseUrl}/downloadFile/${documentId}`);
    console.log("myrest", res);
    
  }


 

  deleteFile(proposalId) {
    console.log(`Deleting ${proposalId}`);
    return this.http.delete(`${this.baseUrl}/delete-attachment/${proposalId}`);
  }

  deleteDocument(id: number): Observable<any> {
    console.log("id of record ",id);
    
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getChildList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/child/${id}`);
  }

  //comment
  addComment(data) {
    return this.http.post(`${this.baseUrlComment}`, data);
  }

  getCommentList(id) {
    return this.http.get(`${this.baseUrlComment}/${id}`);
  }

  getCommentById(id) {
    return this.http.get(`${this.baseUrlComment}/single/${id}`)
  }

  editComment(id: number, data) {
    return this.http.put(`${this.baseUrlComment}/${id}`, data);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrlComment}/${id}`, { responseType: 'text' });
  }
  //end

  getDocumentList() {
    return this.http.get(`${this.baseUrl}`);
  }

  getDocumentAttachments(documentId) {
    return this.http.get(`${this.baseUrlAttachment}/document/${documentId}`);
  }


  deleteDocumentAttachment(documentAttachmentId) {
    return this.http.delete(`${this.baseUrlAttachment}/delete/${documentAttachmentId}`);
  }

}
