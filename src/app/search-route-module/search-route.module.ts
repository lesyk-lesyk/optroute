import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GMapModule } from 'app/gmap/gmap.module';
import { GMapModule as PrimeGMapModule } from 'primeng/components/gmap/gmap';
import { ButtonModule } from 'primeng/components/button/button';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { SharedModule } from 'primeng/components/common/shared';

import { SearchRouteRoutingModule } from './search-route-routing.module';
import { SearchRouteComponent } from './search-route-page/search-route.component';

@NgModule({
  imports: [
    CommonModule,
    SearchRouteRoutingModule,
    PrimeGMapModule,
    GMapModule,
    ButtonModule,
    DataTableModule
  ],
  declarations: [
    SearchRouteComponent
  ]
})
export class SearchRouteModule { }
