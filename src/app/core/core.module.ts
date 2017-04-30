import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';

// Pages
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    PageNotFoundComponent,
    HomePageComponent
  ],
  exports: [
    NavbarComponent,
  ],
  providers: []
})

export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
