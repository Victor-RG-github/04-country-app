import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.invokeUrl(url);
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.invokeUrl(url);
  }

  searchRegion(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.invokeUrl(url);
  }

  private invokeUrl(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }
}
