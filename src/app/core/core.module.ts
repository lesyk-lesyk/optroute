import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ChartModule } from 'primeng/components/chart/chart';
import { DataTableModule } from 'primeng/components/datatable/datatable';
// Components
import { NavbarComponent } from './components/navbar/navbar.component';

// Pages
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

// Services
import { FormatterService } from './services/formatter.service';
import { CompareResultsPageComponent } from './pages/compare-results-page/compare-results-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ChartModule,
    DataTableModule
  ],
  declarations: [
    NavbarComponent,
    PageNotFoundComponent,
    HomePageComponent,
    CompareResultsPageComponent
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    FormatterService
  ]
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
