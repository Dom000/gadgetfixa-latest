import { clearAnonymousUser } from "@/lib/anonymous-user";
import { authClient } from "@/lib/client";
import { AuthState, DefaultView } from "@/types";
import { getCookie } from "cookies-next";
import { StateCreator } from "zustand";

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  isAuthenticated: false,
  isAdmin: getCookie(process.env.NEXT_PUBLIC_ADMIN_LOGGEDIN_COOKIE!) as any,
  userDetails: null as any,
  anonymousUser: null as any,
  login: (user) => set({ isAuthenticated: true, userDetails: user }),
  logout: () => {
    set({
      isAuthenticated: false,
      userDetails: null,
      anonymousUser: null,
    });
    // Clear localStorage to prevent data persistence between users
    if (typeof window !== "undefined") {
      localStorage.removeItem(
        process.env.NEXT_PUBLIC_USER_PERSIST || "user_persist"
      );
      authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/auth";
          },
        },
      });
    }
  },
  getIsAdmin: () => {
    return getCookie(process.env.NEXT_PUBLIC_ADMIN_LOGGEDIN_COOKIE!) as any;
  },
  setAnonymousUser: (user) => set({ anonymousUser: user }),
});
