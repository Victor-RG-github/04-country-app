import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private httpClient: HttpClient) {
    this.loadCacheFromLocalStorage();
  }

  private saveCacheToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadCacheFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

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
    return this.invokeUrl(`${this.apiUrl}/capital/${term}`).pipe(
      tap((countries) => (this.cacheStore.byCapital = { term, countries })),
      tap(() => {
        this.saveCacheToLocalStorage();
      })
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.invokeUrl(`${this.apiUrl}/name/${term}`).pipe(
      tap((countries) => (this.cacheStore.byCountry = { term, countries })),
      tap(() => {
        this.saveCacheToLocalStorage();
      })
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this.invokeUrl(`${this.apiUrl}/region/${region}`).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries })),
      tap(() => {
        this.saveCacheToLocalStorage();
      })
    );
  }

  private invokeUrl(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError(() => {
        return of([]);
      })
    );
  }
}
