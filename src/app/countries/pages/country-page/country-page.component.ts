import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent implements OnInit {
  country?: Country;

  constructor(
    private activatedRout: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //subscribe Hell - mala manera
    /*     this.activatedRout.params.subscribe(({ id }) => {
      this.countriesService.searchCountryByAlphCode(id).subscribe((country) => {
        console.log(country);
      });
    }); */

    //Solucion al subscribe Hell con RxJS
    this.activatedRout.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchCountryByAlphCode(id))
      )
      .subscribe((country) => {
        if (!country) return this.router.navigateByUrl('');
        return (this.country = country);
      });
  }
}
