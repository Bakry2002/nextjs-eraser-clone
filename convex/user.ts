import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// GET USER
export const getUser = query({
    // args: is the input type
    // handler: is the function that will be called when the query is called
    args: {
        email: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('user')
            .filter((q) => q.eq(q.field('email'), args.email))
            .collect(); // query the user table for the user with the given email

        return result;
    },
});

// CREATE USER
export const createUser = mutation({
    // mutation used to do CRUD operations
    args: {
        name: v.string(),
        email: v.string(),
        image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const newUser = await ctx.db.insert('user', args);

        return newUser;
    },
});
