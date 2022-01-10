import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  countries: any;
  filteredCountries: any;
  _searchText: string;
  loaded: boolean = false;
  selectRegion: boolean = false;
  currency: any = [];
  language: any = [];

  regions = [ "Africa", "Americas", "Asia", "Europe", "Oceania"];

  get searchText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
    this.filteredCountries = this.filterCountries(value);
  }

  constructor(private themeService: ThemeService, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.selectRegion = false;
    // Load Theme
    this.themeService.load();
    this.listOfCountries();
  }

  listOfCountries() {
    this.apiService.getCountries().subscribe(
      (res: any) => {
        if(res.status == 200) {
          this.countries = res.body;
          this.filteredCountries = this.countries;
          this.loaded = true;
        }
        else {
          
        }
      },
      (err: any) => {
        throw err;
      }
    );
  }

  filterCountries(searchValue: string) {
    if(this.selectRegion == true) {
      return this.filteredCountries.filter(country =>
        country.name.common.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
    } else {
      return this.countries.filter(country =>
        country.name.common.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
    }
  }

  filterCountriesByRegion(value: string) {
    if(value == null) {
      this.selectRegion = false;
      this.filteredCountries = this.countries;
      return this.filteredCountries;
    } else {
      this.selectRegion = true;
      return this.countries.filter(country =>
        country.region.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    }
  }

  onSelect(value: string) {
    this.filteredCountries = this.filterCountriesByRegion(value);
  }

  details(country: any) {
    if(country.currencies) {
      let currencies: any = Object.values(country.currencies);
      currencies.forEach(element => {
        this.currency.push(element.name)
      })
    } else {
      let currencies = '';
      this.currency.push(currencies);
    }

    if(country.languages) {
      let languages: any = Object.values(country.languages);
      languages.forEach(element => {
        this.language.push(element)
      })
    } else {
      let languages = '';
      this.language.push(languages);
    }


    let country_details = {
      flag: country.flags.png,
      name: country.name.common,
      population: country.population,
      region: country.region,
      subregion: country.subregion,
      capital: country.capital,
      domain: country.tld,
      currency: this.currency,
      language: this.language,
      borderCountries: country.borders,
      cca: country.cca2,
      latitude: country.latlng[0],
      longitude: country.latlng[1]
    }

    localStorage.setItem('details', JSON.stringify(country_details));
    this.router.navigateByUrl('details');
  }

}
