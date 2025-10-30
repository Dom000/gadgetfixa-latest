import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/lib/prisma/generated";
import * as argon2 from "argon2";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    modelName: "profile",
    fields: {
      email: "email",
      name: "fullName",
    },
  },
  account: {
    modelName: "account",
    fields: {
      userId: "userId",
      type: "type",
      provider: "providerId",
      providerAccountId: "accountId",
    },
  },
  
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password: string) => {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
      },
      verify: async (data: { hash: string; password: string }) => {
        const isValid = await argon2.verify(data.hash, data.password);
        return isValid;
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
