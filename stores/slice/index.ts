import { AuthState, DefaultView} from "@/types";
import { getCookie } from "cookies-next";
import { StateCreator } from "zustand";

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  isAuthenticated: false,
  isAdmin: getCookie(process.env.NEXT_PUBLIC_ADMIN_LOGGEDIN_COOKIE!) as any,
  userDetails: null as any,
  defaultView: "user" as DefaultView,
  editPage: false,
  login: (user) => set({ isAuthenticated: true, userDetails: user }),
  logout: () => {
    set({ isAuthenticated: false, userDetails: null, defaultView: DefaultView.USER, editPage: false });
    // Clear localStorage to prevent data persistence between users
    if (typeof window !== 'undefined') {
      localStorage.removeItem(process.env.NEXT_PUBLIC_USER_PERSIST || "user_persist");
    }
  },
  getIsAdmin: () => {
    return getCookie(process.env.NEXT_PUBLIC_ADMIN_LOGGEDIN_COOKIE!) as any;
  },
  setDefaultView: (by: DefaultView) => {
    set({ defaultView: by });
  },
});
