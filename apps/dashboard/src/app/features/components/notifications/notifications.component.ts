import { Component, inject, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import { CloseNotificationAction, NotificationState } from '@dcs-libs/shared';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: false
})
export class NotificationsComponent {
  private store = inject(Store);

  notifications = toSignal(this.store.select(NotificationState.notifications), {
    initialValue: []
  });

  notificationsMap: Set<number> = new Set<number>();

  constructor() {
    effect(() => {
      this.notifications()
        .filter((not) => !this.notificationsMap.has(not.id))
        .forEach((not) => this.startNotification(not.id));
    });
  }

  startNotification(id: number) {
    this.notificationsMap.add(id);
    setTimeout(
      (
        idInternal: number,
        notificationsMap: Set<number>,
        closeNotification: (id: number) => void
      ) => {
        closeNotification(idInternal);
        notificationsMap.delete(idInternal);
      },
      2000,
      id,
      this.notificationsMap,
      this.closeNotification.bind(this)
    );
  }

  closeNotification(id: number) {
    this.store.dispatch(new CloseNotificationAction(id));
  }
}
