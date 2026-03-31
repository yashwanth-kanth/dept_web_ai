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
  
  // Inject CORS headers into the better-auth response
  const newHeaders = new Headers(response.headers);
  const cors = CORS_HEADERS(request);
  Object.entries(cors).forEach(([key, value]) => {
    newHeaders.set(key, value);
  });

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
