import {Notification} from '../models';

export interface NotificationStateModel {
  notifications: Notification[];
}

export const initNotificationStateModel = () => {
  return {
    notifications: []
  } as NotificationStateModel;
};
