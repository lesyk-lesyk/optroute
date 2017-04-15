import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-g-map',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {

  options: any;

  overlays: any[];

  constructor() { }

  ngOnInit() {
    this.options = {
      center: { lat: 49.8397, lng: 24.0297 },
      zoom: 12
    };
  }

}
