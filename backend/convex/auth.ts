import { betterAuth } from "better-auth";
import { convexAdapter } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { components } from "./_generated/api";

export const getAuth = (ctx: any) => {
  console.log(`[Auth] Initializing Better Auth for request to ${process.env.CONVEX_SITE_URL}`);
  return betterAuth({
    database: convexAdapter(ctx, (components as any).betterAuth),
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
      enabled: true,
    },
    baseURL: process.env.CONVEX_SITE_URL + "/api/auth",
    trustedOrigins: [process.env.SITE_URL, "http://localhost:5173"].filter(Boolean) as string[],
    plugins: [
      convex({
        authConfig: {
          providers: [{ applicationID: "convex", domain: process.env.CONVEX_SITE_URL! }]
        }
      })
    ]
  });
};
