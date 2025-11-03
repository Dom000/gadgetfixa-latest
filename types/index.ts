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

export interface Business {
  bussinessName: string;
  occupation: string;
  categories: string[];
  email: string;
  phone: string;
  website: string;
  address: string;
  description: string;
}
