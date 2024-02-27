import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// GET TEAM
export const getTeam = query({
    args: {
        email: v.string(),
    },

    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('teams')
            .filter((q) => q.eq(q.field('createdBy'), args.email))
            .collect();
        // get the teams created by the user with the given email

        return result;
    },
});

// CREATE TEAM
export const createTeam = mutation({
    args: {
        name: v.string(),
        createdBy: v.string(),
    },

    handler: async (ctx, args) => {
        const result = await ctx.db.insert('teams', args);

        return result;
    },
});
