import { query } from "./_generated/server";
import { v } from "convex/values";

export const getEventsByStatus = query({
  args: { status: v.union(v.literal("upcoming"), v.literal("past")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("status"), args.status))
      .collect();
  },
});

export const getAllEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});
