import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { SearchRouteComponent } from './search-route/search-route.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CoreModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SearchRouteComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
