import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GMapModule } from 'primeng/components/gmap/gmap';

import { GmapComponent } from './gmap/gmap.component';


@NgModule({
  imports: [
    CommonModule,
    GMapModule
  ],
  declarations: [GmapComponent],
  exports: [GmapComponent]
})
export class GmapModule { }
