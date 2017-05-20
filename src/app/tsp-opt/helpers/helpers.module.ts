import { NgModule } from '@angular/core';

import { HelpersService } from './helpers.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    HelpersService
  ]
})
export class HelpersModule { }

declare global {
  interface Array<T> {
    clone(): Array<T>;
  }
}

if (!Array.prototype.clone) {
  Array.prototype.clone = function <T>(): T[] {
    return this.slice(0);
  }
}
