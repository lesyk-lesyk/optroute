import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GMapModule } from 'primeng/components/gmap/gmap';

// Components
import { GmapComponent } from './gmap/gmap.component';

// Services
import { GMapApiClientService } from 'app/gmap/services/gmap-api-client.service';

@NgModule({
  imports: [
    CommonModule,
    GMapModule
  ],
  declarations: [
    GmapComponent
  ],
  exports: [
    GmapComponent
  ],
  providers: [
    GMapApiClientService
  ]
})
export class GmapModule { }
