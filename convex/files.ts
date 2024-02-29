import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// CREATE FILE
export const createFile = mutation({
    args: {
        name: v.string(),
        teamId: v.string(),
        createdBy: v.string(),
        archive: v.boolean(),
        document: v.string(),
        whiteboard: v.string(),
    },

    handler: async (ctx, args) => {
        const result = await ctx.db.insert('files', args);

        return result;
    },
});

// GET FILES
export const getFiles = query({
    args: {
        teamId: v.string(),
    },

    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('files')
            .filter((q) => q.eq(q.field('teamId'), args.teamId))
            .order('desc')
            .collect();
        // get all files for a team

        return result;
    },
});

export const getFileById = query({
    args: { _id: v.id('files') },
    handler: async (ctx, args) => {
        const file = await ctx.db.get(args._id);

        return file;
    },
});
// GET FILE BY ID
// export const getFileById = query({
//     args: {
//         _id: v.string(),
//     },

//     handler: async (ctx, args) => {
//         const result = await ctx.db
//             .query('files')
//             .filter((q) => q.eq(q.field('_id'), args._id))
//             .collect();

//         return result;
//     },
// });
