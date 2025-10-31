import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { createAuthSlice } from "../slice";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { AuthState } from "@/types";

export type AppState = AuthState;
export type AppActions = {
  login: (user: any) => void;
  logout: () => void;
  getIsAdmin: () => boolean;
  setDefaultView: (by: any) => void;
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (...args) => ({
        ...createAuthSlice(...args),
      }),
      {
        name: process.env.NEXT_PUBLIC_USER_PERSIST || "user_persist",
        partialize: (state) => ({
          userDetails: state.userDetails,
          isAuthenticated: state.isAuthenticated,
        }),
        onRehydrateStorage: () => (state) => {
          if (state && !state.isAuthenticated) {
            state.userDetails = null;
          }
        },
      }
    ),
    { name: "Zustand Quiz Store" }
  )
);

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store1", useAppStore);
}
