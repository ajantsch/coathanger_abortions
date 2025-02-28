import { IBaseAction } from "./index";

export enum NotificationActionTypes {
  SHOW_NOTIFICATION = "SHOW_NOTIFICATION",
  HIDE_NOTIFICATION = "HIDE_NOTIFICATION",
  RESET_NOTIFICATION = "RESET_NOTIFICATION",
}

export interface IShowNotificationAction extends IBaseAction {
  type: NotificationActionTypes.SHOW_NOTIFICATION;
  payload: string;
}

export interface IHideNotificationAction extends IBaseAction {
  type: NotificationActionTypes.HIDE_NOTIFICATION;
}

export interface IResetNotificationAction extends IBaseAction {
  type: NotificationActionTypes.RESET_NOTIFICATION;
}

export type NotificationAction = IShowNotificationAction | IHideNotificationAction | IResetNotificationAction;

export function showNotification(text: string): IShowNotificationAction {
  return {
    type: NotificationActionTypes.SHOW_NOTIFICATION,
    payload: text,
  };
}

export function hideNotification(): IHideNotificationAction {
  return {
    type: NotificationActionTypes.HIDE_NOTIFICATION,
  };
}

export function resetNotification(): IResetNotificationAction {
  return {
    type: NotificationActionTypes.RESET_NOTIFICATION,
  };
}
