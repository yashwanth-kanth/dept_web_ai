import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const resolveEventImage = async (ctx, event) => {
  if (event.image && !event.image.startsWith('http') && !event.image.startsWith('/') && event.image.length > 20) {
    try {
      const url = await ctx.storage.getUrl(event.image);
      if (url) event = { ...event, image: url };
    } catch (e) {}
  }
  
  if (event.gallery) {
    const galleryUrls = await Promise.all(
      event.gallery.map(async (img) => {
        if (img && !img.startsWith('http') && !img.startsWith('/') && img.length > 20) {
          try {
            return (await ctx.storage.getUrl(img)) || img;
          } catch (e) {
            return img;
          }
        }
        return img;
      })
    );
    event = { ...event, gallery: galleryUrls };
  }
  
  return event;
};

export const getAllEvents = query({
  args: {},
  handler: async (ctx) => {
    const events = await ctx.db.query("events").collect();
    return Promise.all(events.map(e => resolveEventImage(ctx, e)));
  },
});

export const getEventsByStatus = query({
  args: { status: v.union(v.literal("upcoming"), v.literal("past")) },
  handler: async (ctx, args) => {
    const events = await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("status"), args.status))
      .collect();
    return Promise.all(events.map(e => resolveEventImage(ctx, e)));
  },
});

export const createEvent = mutation({
  args: {
    title: v.string(),
    date: v.string(),
    venue: v.string(),
    description: v.string(),
    speakers: v.optional(v.string()),
    image: v.optional(v.string()),
    gallery: v.optional(v.array(v.string())),
    tag: v.optional(v.string()),
    color: v.optional(v.string()),
    status: v.union(v.literal("upcoming"), v.literal("past")),
    isFeatured: v.optional(v.boolean()),
    rsvps_count: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", args);
  },
});

export const updateEvent = mutation({
  args: {
    id: v.id("events"),
    title: v.string(),
    date: v.string(),
    venue: v.string(),
    description: v.string(),
    speakers: v.optional(v.string()),
    image: v.optional(v.string()),
    gallery: v.optional(v.array(v.string())),
    tag: v.optional(v.string()),
    color: v.optional(v.string()),
    status: v.union(v.literal("upcoming"), v.literal("past")),
    isFeatured: v.optional(v.boolean()),
    rsvps_count: v.number(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deleteEvent = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
