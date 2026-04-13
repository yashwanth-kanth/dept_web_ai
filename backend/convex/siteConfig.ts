import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getConfigs = query({
  args: {},
  handler: async (ctx) => {
    const configs = await ctx.db.query("siteConfig").collect();
    return Promise.all(
      configs.map(async (c) => {
        if (typeof c.value === 'string' && !c.value.startsWith('http') && c.value.length > 20 && !c.value.includes(' ')) {
          try {
            const url = await ctx.storage.getUrl(c.value);
            if (url) return { ...c, value: url };
          } catch (e) {
            // Not a valid storage ID, but that's okay
          }
        }
        return c;
      })
    );
  },
});

export const getConfigByKey = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const config = await ctx.db
      .query("siteConfig")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();
    if (config && typeof config.value === 'string' && !config.value.startsWith('http') && config.value.length > 20) {
      const url = await ctx.storage.getUrl(config.value);
      if (url) return { ...config, value: url };
    }
    return config;
  },
});

export const updateConfig = mutation({
  args: { 
    key: v.string(), 
    value: v.any() 
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("siteConfig")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value });
      return existing._id;
    } else {
      return await ctx.db.insert("siteConfig", { 
        key: args.key, 
        value: args.value 
      });
    }
  },
});
