import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './core/pages/home-page/home-page.component';
import { PageNotFoundComponent } from './core/pages//page-not-found/page-not-found.component';
import { TreantTreeComponent } from './core/components/treant-tree/treant-tree.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'search-route', loadChildren: 'app/search-route-module/search-route.module#SearchRouteModule' },
  { path: 'tree', component: TreantTreeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
