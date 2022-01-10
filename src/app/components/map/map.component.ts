import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat: number;
  lng: number;
  detailsData: any = [];

  constructor( private location: Location ) {
    this.detailsData =  JSON.parse(localStorage.getItem('details'));
    this.lat = this.detailsData.latitude;
    this.lng = this.detailsData.longitude;
   }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

}
