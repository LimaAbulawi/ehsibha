import { environment } from './../../environments/environment.test';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DbservicesService {

  constructor(private http: HttpClient) { }

  ServiceProviderId = 1;
  // url: string = 'https://apinext.ehsibha.sa/';

  getAll() {
    return this.http.get(`${environment.url}web/common/GetSpAppraisalByProviderId?ServiceProviderId=1`);
  }
  getApprisalByID(id: number) {
    return this.http.get(`${environment.url}web/common/GetSpAppraisalBySpAppraisalId?SpAppraisalId=${id}`);
  }
  editById(body: any) {
    return this.http.post(`${environment.url}web/common/UpdateSpAppraisalBySpAppraisalId`, body);
  }
  ADDNewAP(body: any) {
    return this.http.post(`${environment.url}web/common/NewSpAppraisalReport`, body)
  }
  // environment.url it could be this.url based in the top url 
}