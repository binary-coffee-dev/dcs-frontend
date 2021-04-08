import { Action, Selector, State, StateContext } from '@ngxs/store';

import { CloseNotificationAction, CreateNotificationAction } from './notification.action';
import { initNotificationStateModel, NotificationStateModel } from './notification-state.model';
import { Notification } from '../../models';

@State<NotificationStateModel>({
  name: 'notification',
  defaults: initNotificationStateModel()
})
export class NotificationState {

  @Selector()
  static notifications(state: NotificationStateModel): Notification[] {
    return state.notifications;
  }

  constructor() {
  }

  @Action(CreateNotificationAction)
  createNotificationAction(ctx: StateContext<NotificationStateModel>, action: CreateNotificationAction) {
    ctx.patchState({
      notifications: [
        ...ctx.getState().notifications,
        {type: action.type, title: action.title, id: new Date().getTime()} as Notification
      ]
    });
  }

  @Action(CloseNotificationAction)
  closeNotificationAction(ctx: StateContext<NotificationStateModel>, action: CloseNotificationAction) {
    ctx.patchState({
      notifications: [...ctx.getState().notifications.filter(not => not.id !== action.id)]
    });
  }
}
