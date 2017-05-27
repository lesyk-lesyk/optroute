import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Message } from 'primeng/components/common/api';

import { NotificationsService } from './../services/notifications.service';

@Component({
  selector: 'app-notification-popup',
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationPopupComponent implements OnInit {

  public msgs: Message[] = [];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.notificationsService.msgsStream.subscribe(message => {
      this.msgs.push(message);
    });
  }
}
