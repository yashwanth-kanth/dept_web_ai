import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    // With Convex, the HTTP auth server is hosted on the .site URL!
    baseURL: import.meta.env.VITE_CONVEX_SITE_URL + "/api/auth",
    fetchOptions: {
        credentials: "include"
    }
});

export const { signIn, signUp, useSession, signOut } = authClient;
