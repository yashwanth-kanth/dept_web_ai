import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const resolvePartnerUrls = async (ctx, partner) => {
  if (partner.logo && !partner.logo.startsWith('http') && partner.logo.length > 20) {
    try {
      const url = await ctx.storage.getUrl(partner.logo);
      if (url) partner = { ...partner, logo: url };
    } catch (e) {}
  }
  if (partner.image && !partner.image.startsWith('http') && partner.image.length > 20) {
    try {
      const url = await ctx.storage.getUrl(partner.image);
      if (url) partner = { ...partner, image: url };
    } catch (e) {}
  }
  return partner;
};

export const getAllPartners = query({
  args: {},
  handler: async (ctx) => {
    const partners = await ctx.db.query("partners").collect();
    return Promise.all(partners.map(p => resolvePartnerUrls(ctx, p)));
  },
});

export const addPartner = mutation({
  args: {
    name: v.string(),
    logo: v.string(),
    image: v.optional(v.string()),
    icon: v.optional(v.string()),
    tags: v.array(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("partners", args);
  },
});

export const updatePartner = mutation({
  args: {
    id: v.id("partners"),
    name: v.string(),
    logo: v.string(),
    image: v.optional(v.string()),
    icon: v.optional(v.string()),
    tags: v.array(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deletePartner = mutation({
  args: { id: v.id("partners") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
