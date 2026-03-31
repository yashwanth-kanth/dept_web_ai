import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "./authSchema";

export default defineSchema({
  ...authTables,
  events: defineTable({
    title: v.string(),
    date: v.string(), // ISO datetime string
    venue: v.string(),
    description: v.string(),
    speakers: v.optional(v.string()),
    image: v.optional(v.string()),
    status: v.union(v.literal("upcoming"), v.literal("past")),
    rsvps_count: v.number(),
  }),
  academicPrograms: defineTable({
    name: v.string(),
    description: v.string(),
    courses: v.optional(
      v.array(
        v.object({
          id: v.string(),
          title: v.string(),
          code: v.string(),
          details: v.any(),
        })
      )
    ),
  }),
  faculty: defineTable({
    name: v.string(),
    designation: v.string(),
    qualification: v.string(),
    email: v.string(),
    photo: v.optional(v.string()),
    bio: v.optional(v.string()),
    research_areas: v.optional(v.string()),
    type: v.union(v.literal("faculty"), v.literal("support")),
  }),
});
