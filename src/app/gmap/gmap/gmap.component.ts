import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-g-map',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.css']
})
export class GmapComponent implements OnInit {

  options: any;

  overlays: any[];

  constructor() { }

  ngOnInit() {
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };
  }

}
