import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './core/pages/home-page/home-page.component';
import { PageNotFoundComponent } from './core/pages//page-not-found/page-not-found.component';
import { CompareResultsPageComponent } from './core/pages/compare-results-page/compare-results-page.component';
import { AboutPageComponent } from "app/core/pages/about-page/about-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'search-route', loadChildren: 'app/search-route-module/search-route.module#SearchRouteModule' },
  { path: 'compare-results', component: CompareResultsPageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
