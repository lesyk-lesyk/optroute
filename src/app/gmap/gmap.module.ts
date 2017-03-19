import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GmapComponent } from './gmap/gmap.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GmapComponent],
  exports: [GmapComponent]
})
export class GmapModule { }
