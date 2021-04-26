import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Ad, GeoLocationResponse } from '../../models';
import { Apollo } from 'apollo-angular';
import { ADS_QUERY } from '../../../graphql/queries';

declare const currentIp: string;

@Injectable()
export class GEOLocationService {

  constructor(private http: HttpClient, private apollo: Apollo) {
  }

  static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getGEOLocation(): Observable<GeoLocationResponse> {
    // Update your api key to get from https://ipgeolocation.io
    const url = `http://api.ipstack.com/${currentIp}?access_key=7048750312a260cf663533657f795d91`;

    const headers = new HttpHeaders();
    headers.set('NO_TOKEN', 'true');

    return this.http.get<GeoLocationResponse>(url, {headers}).pipe(catchError(GEOLocationService.handleError));
  }

  getAds(country: string): Observable<Ad[]> {
    return this.apollo
      .query({query: ADS_QUERY, fetchPolicy: 'no-cache', variables: {country}})
      .pipe(map((result: any) => result.data.findRandomAds));
  }
}
