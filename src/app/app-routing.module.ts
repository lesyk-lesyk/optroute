import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { SearchRouteComponent } from './search-route/search-route.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'search-route', component: SearchRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
