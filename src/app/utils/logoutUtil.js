import { store } from "@/app/state/store";
import { logout } from "@/app/state/slices/userdataSlice";
import {redirect} from "next/navigation";
export const performLogout = () => {
  try {
    if (typeof window === "undefined") return false;

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    store.dispatch(logout());
    redirect("/login");

    return true;
  } 
  catch (error) {
    return false;
  }
};