import { Bussiness } from "@/lib/prisma/generated";

export enum DefaultView {
  USER = "user",
  ADMIN = "admin",
}

export enum ChatView {
  INBOX = "inbox",
  CHAT = "chat",
}

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: any;
  userDetails: any | null;
  anonymousUser: any | null;
  login: (user: any) => void;
  logout: () => void;
  setAnonymousUser: (user: any) => void;
  chatCurrentView: ChatView;
  setChatCurrentView: (view: ChatView) => void;
}

export type BusinessType = Bussiness & {
  isPrivate?: boolean;
  isOnline?: boolean;
  reviews?: {
    id: string;
    anonymous: boolean;
    anonymousName?: string | null;
    createdAt: Date;
    comment: string;
    rating: number;
    name?: string;
  }[];
  categories: { name: string; id: string }[];
  portfolios?: {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
  }[];
  specialties?: string[];
  location?: string;
  private?: boolean;
};

export interface ReviewInput {
  profileId?: string | null;
  anonymous: boolean;
  anonymousName?: string | null;
  bussinessId: string;
  rating: number;
  comment: string;
}

export interface SendMessageInput {
  senderId: string;
  receiverId: string;
  content: string;
}

export interface MessageInbox {
  id: string;
  content: string;
  createdAt: Date;
  sender: {
    fullName: string;
    id: string;
  };
  receiver: {
    fullName: string;
    id: string;
  };
}

export interface Inbox {
  id: string;
  messages: MessageInbox[];
  user1: {
    id: string;
    fullName: string;
  };
  user2: {
    id: string;
    fullName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
