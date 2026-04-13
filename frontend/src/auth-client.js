import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  // Requests go to /api/auth/* which Vite proxies to the Express backend
  baseURL: window.location.origin,
  fetchOptions: {
    credentials: "include"
  }
});

export const { signIn, signUp, useSession, signOut } = authClient;
