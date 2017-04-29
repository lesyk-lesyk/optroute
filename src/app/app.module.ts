import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchRouteComponent } from './search-route/search-route.component';
import { GMapModule as PrimeGMapModule } from 'primeng/components/gmap/gmap';
import { GMapModule } from './gmap/gmap.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    PrimeGMapModule,
    GMapModule
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchRouteComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
