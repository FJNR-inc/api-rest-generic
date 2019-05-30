import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import GlobalService from './global.service';
import {Observable} from 'rxjs';
import {ResponseApi} from './models/response-api';

export interface SearchField {
  [field: string]: string | string[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiRestGenericLibService <T> extends GlobalService {

  public url: string;

  constructor(public http: HttpClient) {
    super();
  }

  get(url: string): Observable<T> {
    return this.http.get<any>(
      url,
      {headers: this.getHeaders()}
    );
  }

  getById(id: number): Observable<T> {
    return this.http.get<any>(
      this.url + '/' + id,
      {headers: this.getHeaders()}
    );
  }

  list(): Observable<ResponseApi<T>> {
    return this.http.get<any>(
      this.url,
      {headers: this.getHeaders()}
    );
  }

  search(searchFields: SearchField): Observable<ResponseApi<T>> {
    const params: HttpParams = new HttpParams({
      fromObject: searchFields
    });

    const headers: HttpHeaders = this.getHeaders();

    return this.http.get<any>(
      this.url,
      {
        headers,
        params
      }
    );
  }


  post(object: T): Observable<T> {

    return this.http.post<T>(
      this.url,
      object,
      {headers: this.getHeaders()}
    );
  }

  patch(url: string, patchContent: any): Observable<T> {

    const headers: HttpHeaders = this.getHeaders();

    return this.http.patch<T>(
      url,
      patchContent,
      {headers}
    );
  }

  delete(url: string): Observable<any> {
    return this.http.delete<any>(
      url,
      {headers: this.getHeaders()}
    );
  }
}
