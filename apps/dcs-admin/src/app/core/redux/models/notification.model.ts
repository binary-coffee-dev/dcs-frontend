export enum NotificationType {
  'danger' = 'danger',
  'info' = 'info',
  'primary' = 'primary',
  'warning' = 'warning'
}

export interface Notification {
  id: number;
  title: string;
  type: NotificationType;
}
