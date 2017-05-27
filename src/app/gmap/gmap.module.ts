/// <reference path='../../../node_modules/@types/google-maps/index.d.ts' />
import { NgModule } from '@angular/core';

// Services
import { GMapApiClientService } from 'app/gmap/services/gmap-api-client.service';
import { GMapCalculationsService } from './services/gmap-calculations.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    GMapApiClientService,
    GMapCalculationsService,
  ]
})
export class GMapModule { }
