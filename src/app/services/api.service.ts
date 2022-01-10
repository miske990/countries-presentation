import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = "https://restcountries.com/v3.1/all";
  apiUrl2: string = "https://restcountries.com/v3.1/alpha/"

  constructor(private http: HttpClient) { }

  getCountries(): Observable<HttpResponse<any>>{

    return this.http.get(this.apiUrl , {observe: 'response'})
      .pipe(
        map(user => {
          return user;
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
  }

  getDetails(value: string): Observable<HttpResponse<any>>{

    return this.http.get(this.apiUrl2 + value , {observe: 'response'})
      .pipe(
        map(user => {
          return user;
        }),
        catchError((err) => {
          return throwError(err);
        })
      )
  }
}
