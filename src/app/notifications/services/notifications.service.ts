import { Injectable } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationsService {

  public msgsStream: Subject<Message>;

  constructor() {
    this.msgsStream = new Subject<Message>();
  }

  public showNotificationPopup(message: Message) {
    this.msgsStream.next(message);
  }
}
