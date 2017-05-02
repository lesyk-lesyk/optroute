import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowlModule } from 'primeng/components/growl/growl';

import { NotificationsService } from './services/notifications.service';
import { NotificationPopupComponent } from './notification-popup/notification-popup.component';

@NgModule({
  imports: [
    CommonModule,
    GrowlModule
  ],
  declarations: [
    NotificationPopupComponent
  ],
  providers: [
    NotificationsService
  ],
  exports: [
    NotificationPopupComponent
  ]
})
export class NotificationsModule { }
