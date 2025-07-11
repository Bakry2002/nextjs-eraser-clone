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
        archive: v.boolean(),
    },

    handler: async (ctx, args) => {
        const result = await ctx.db
            .query('files')
            .filter((q) => q.eq(q.field('teamId'), args.teamId))
            .filter((q) => q.eq(q.field('archive'), args.archive))
            .order('desc')
            .collect();
        // get all files for a team

        return result;
    },
});

// GET FILE BY ID
export const getFileById = query({
    args: { _id: v.id('files') },
    handler: async (ctx, args) => {
        const file = await ctx.db.get(args._id);

        return file;
    },
});

// DELETE FILE
export const deleteFile = mutation({
    args: { _id: v.id('files') },
    handler: async (ctx, args) => {
        const result = await ctx.db.delete(args._id);

        return result;
    },
});

// ARCHIVE FILE
export const archiveFile = mutation({
    args: {
        _id: v.id('files'),
        archive: v.boolean(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args._id, {
            archive: args.archive,
        });

        return result;
    },
});

// UNARCHIVE FILE
export const unarchiveFile = mutation({
    args: {
        _id: v.id('files'),
        archive: v.boolean(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args._id, {
            archive: args.archive,
        });

        return result;
    },
});

// UPDATE NAME
export const updateFileName = mutation({
    args: {
        _id: v.id('files'),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args._id, {
            name: args.name,
        });

        return result;
    },
});

// UPDATE DOCUMENT
export const updateDocument = mutation({
    args: {
        _id: v.id('files'),
        document: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args._id, {
            document: args.document,
        });

        return result;
    },
});

// UPDATE WHITEBOARD
export const updateWhiteboard = mutation({
    args: {
        _id: v.id('files'),
        whiteboard: v.string(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args._id, {
            whiteboard: args.whiteboard,
        });

        return result;
    },
});
