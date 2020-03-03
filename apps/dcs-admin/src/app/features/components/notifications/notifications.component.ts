import {Component, OnInit} from '@angular/core';

import {Store} from '@ngxs/store';

import {CloseNotificationAction, Notification, NotificationState} from '@dcs-libs/shared';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];

  notificationsMap: Set<number> = new Set<number>();

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(NotificationState.notifications)
      .subscribe((notifications: Notification[]) => {
        notifications
          .filter(not => !this.notificationsMap.has(not.id))
          .forEach(not => this.startNotification(not.id));
        this.notifications = notifications;
      });
  }

  startNotification(id) {
    this.notificationsMap.add(id);
    setTimeout((idInternal: number, notificationsMap: Set<number>, closeNotification: (id: number) => void) => {
      closeNotification(idInternal);
      notificationsMap.delete(idInternal);
    }, 2000, id, this.notificationsMap, this.closeNotification.bind(this));
  }

  closeNotification(id: number) {
    this.store.dispatch(new CloseNotificationAction(id));
  }

}
