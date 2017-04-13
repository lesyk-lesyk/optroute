import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchRouteComponent } from './search-route/search-route.component';
import { GmapModule } from './gmap/gmap.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule,
    GmapModule
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
