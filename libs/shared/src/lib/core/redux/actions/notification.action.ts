import {NotificationType} from '../models';

export class CreateNotificationAction {
  static readonly type = '[Notification] create notification action';

  constructor(public title: string, public type: NotificationType) {
  }
}

export class CloseNotificationAction {
  static readonly type = '[Notification] close notification action';

  constructor(public id: number) {
  }
}
