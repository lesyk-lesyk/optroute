import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchRouteComponent } from './search-route-page/search-route.component';

const routes: Routes = [
  { path: '', component: SearchRouteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRouteRoutingModule { }
