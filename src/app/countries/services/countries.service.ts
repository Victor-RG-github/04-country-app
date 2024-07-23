import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}

  searchCountryByAlphCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;

    return this.httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => {
        return of(null);
      })
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.invokeUrl(`${this.apiUrl}/capital/${term}`);
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.invokeUrl(`${this.apiUrl}/name/${term}`);
  }

  searchRegion(term: string): Observable<Country[]> {
    return this.invokeUrl(`${this.apiUrl}/region/${term}`);
  }

  private invokeUrl(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }
}
