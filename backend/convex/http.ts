import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { getAuth } from "./auth";

const http = httpRouter();

const CORS_HEADERS = (request: Request) => {
  const origin = request.headers.get("Origin");
  // Never use '*' when allow-credentials is true
  const allowedOrigin = origin || "http://localhost:5173"; 
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PATCH, PUT, DELETE",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Better-Auth-Client-Id, better-auth-client-id, X-Requested-With",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
  };
};

const handleAuth = httpAction(async (ctx: any, request: Request) => {
  const auth = getAuth(ctx);
  const response = await auth.handler(request);
  
  const newHeaders = new Headers(response.headers);
  const cors = CORS_HEADERS(request);
  Object.entries(cors).forEach(([key, value]) => {
    newHeaders.set(key, value);
  });

  // CRITICAL FIX: Force SameSite=None; Secure for cross-origin session persistence
  // Better-Auth may default to Lax/Secure in some environments, which blocks localhost cookies.
  const setCookies = response.headers.get("set-cookie");
  if (setCookies) {
    // Note: get('set-cookie') in many environments can return a comma-separated string 
    // of all cookies, which is tricky. But for sign-in, there's usually just one main session cookie.
    // We rewrite the header to ensure it's compatible with cross-site requests.
    const cookiesArr = setCookies.split(/,(?=[^;]+=[^;]+)/); // Split cookies properly
    newHeaders.delete("set-cookie");
    cookiesArr.forEach(cookie => {
      let modified = cookie.trim();
      // Ensure SameSite=None and Secure
      if (modified.includes("SameSite=")) {
        modified = modified.replace(/SameSite=[^;]+/i, "SameSite=None");
      } else {
        modified += "; SameSite=None";
      }
      
      if (!modified.includes("Secure")) {
        modified += "; Secure";
      }

      // Ensure Partitioned for newer browser privacy rules (optional but good)
      if (!modified.includes("Partitioned")) {
        // modified += "; Partitioned";
      }
      
      newHeaders.append("set-cookie", modified);
    });
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
});

http.route({
  pathPrefix: "/api/auth/",
  method: "POST",
  handler: handleAuth,
});

http.route({
  pathPrefix: "/api/auth/",
  method: "GET",
  handler: handleAuth,
});

http.route({
  pathPrefix: "/api/auth/",
  method: "OPTIONS",
  handler: httpAction(async (_ctx, request) => {
    return new Response(null, {
      status: 204,
      headers: new Headers(CORS_HEADERS(request)),
    });
  }),
});

export default http;
