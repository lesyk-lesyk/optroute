import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchRouteComponent } from './search-route/search-route.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search-route', component: SearchRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
