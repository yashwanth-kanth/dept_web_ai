import { query } from "./_generated/server";

export const getPrograms = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("academicPrograms").collect();
  },
});
