/// <reference path='../../../node_modules/@types/google-maps/index.d.ts' />
import { NgModule } from '@angular/core';

// Services
import { GMapApiClientService } from 'app/gmap/services/gmap-api-client.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    GMapApiClientService
  ]
})
export class GMapModule { }
