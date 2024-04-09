import { USER_INFO } from "../data/app.const";
import { Auth } from "../models/auth.model";

export const setUserLocalStorage = (user: Auth): void => localStorage.setItem(USER_INFO, JSON.stringify({ ...user }));

export const removeUserFromLocalStorage = (): void => localStorage.removeItem(USER_INFO);

export const getUserFromLocalStorage = (): Auth | undefined => {
  const userInfo: Auth | undefined = localStorage.getItem(USER_INFO) ? JSON.parse(localStorage.getItem(USER_INFO)!) : undefined;
  return userInfo;
}