import { store } from "@/app/state/store";
import { logout } from "@/app/state/slices/userdataSlice";

export const performLogout = () => {
  try {
    if (typeof window === "undefined") return false;

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    store.dispatch(logout());
    window.location.href = "/";

    return true;
  } 
  catch (error) {
    return false;
  }
};