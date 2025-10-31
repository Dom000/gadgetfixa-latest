export enum DefaultView {
  USER = "user",
  ADMIN = "admin",
}

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: any;
  editPage: boolean;
  userDetails: any | null;
  defaultView: DefaultView;
  login: (user: any) => void;
  logout: () => void;
}
