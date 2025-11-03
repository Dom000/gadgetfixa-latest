export enum DefaultView {
  USER = "user",
  ADMIN = "admin",
}

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: any;
  userDetails: any | null;
  anonymousUser: any | null;
  login: (user: any) => void;
  logout: () => void;
  setAnonymousUser: (user: any) => void;
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
