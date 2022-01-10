import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  detailsData: any = [];
  currency: any = [];
  language: any = [];
  messageText: string = "";
  message: boolean = false;

  constructor( private themeService: ThemeService, private apiService: ApiService, private location: Location, private router: Router ) { 
    if(localStorage.getItem('details')) {
      this.detailsData =  JSON.parse(localStorage.getItem('details'));
      
    }
  }

  ngOnInit(): void {
    // Load Theme
    this.themeService.load();
  }

  back() {
    this.location.back();
  }

  viewMap() {
    this.router.navigateByUrl('map');
  }

  details(border: string) {
    this.currency = [];
    this.language = [];
    this.apiService.getDetails(border).subscribe(
      (res: any) => {
        if(res.status == 200) {
          let currencies: any = Object.values(res.body[0].currencies);
          currencies.forEach(element => {
            this.currency.push(element.name)
          })
      
          let languages: any = Object.values(res.body[0].languages);
          languages.forEach(element => {
            this.language.push(element)
          })
      
          let country_details = {
            flag: res.body[0].flags.png,
            name: res.body[0].name.common,
            population: res.body[0].population,
            region: res.body[0].region,
            subregion: res.body[0].subregion,
            capital: res.body[0].capital,
            domain: res.body[0].tld,
            currency: this.currency,
            language: this.language,
            latitude: res.body[0].latlng[0],
            longitude: res.body[0].latlng[1],
            borderCountries: res.body[0].borders
          }
          localStorage.setItem('details', JSON.stringify(country_details));
          this.detailsData =  JSON.parse(localStorage.getItem('details'));
        }
      },
      (err: any) => {
        console.log('nema')
        this.message = true;
        this.messageText = "Country Details Is Not Available!";
        throw err;
      }
    );
  }

}
