import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class ApiService {

  private readonly baseURL: string = '';

  constructor(
    private http: HttpClient,
  ) {
    this.baseURL = `${environment.apiSettings.protocol}://${environment.apiSettings.hostname}:${environment.apiSettings.port}/`;
  }

  private static formatErrors(errorObj: HttpErrorResponse) {
    const message = JSON.stringify(errorObj.error);
    return throwError(message);
  }

  get(path: string, params?: any): Observable<any> {
    return this.http.get(`${this.baseURL}${path}`, {params})
      .pipe(catchError(ApiService.formatErrors));
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(`${this.baseURL}${path}`, body)
      .pipe(catchError(ApiService.formatErrors));
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(`${this.baseURL}${path}`, body)
      .pipe(catchError(ApiService.formatErrors));
  }

  patch(path: string, body: object = {}): Observable<any> {
    return this.http.patch(`${this.baseURL}${path}`, body)
      .pipe(catchError(ApiService.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.baseURL}${path}`)
      .pipe(catchError(ApiService.formatErrors));
  }
}
