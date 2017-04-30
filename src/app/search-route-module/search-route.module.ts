import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GMapModule as PrimeGMapModule } from 'primeng/components/gmap/gmap';
import { GMapModule } from "app/gmap/gmap.module";

import { SearchRouteRoutingModule } from './search-route-routing.module';
import { SearchRouteComponent } from './search-route-page/search-route.component';

@NgModule({
  imports: [
    CommonModule,
    SearchRouteRoutingModule,
    PrimeGMapModule,
    GMapModule
  ],
  declarations: [
    SearchRouteComponent
  ]
})
export class SearchRouteModule { }
