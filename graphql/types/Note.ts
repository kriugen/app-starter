import { nonNull, objectType, stringArg, extendType } from 'nexus';
import { connectionFromArraySlice, cursorToOffset } from 'graphql-relay';

export const Note = objectType({
  name: 'Note',
  definition(t) {
    t.string('id');
    t.int('userId');
    t.string('title');
    t.string('body');
  },
});

// get ALl Notes
export const NotesQuery = extendType({
  type: 'Query',
  definition(t) {
    t.connectionField('notes', {
      type: Note,
      resolve: async (_, { after, first }, ctx) => {
        const offset = after ? cursorToOffset(after) + 1 : 0;
        if (isNaN(offset)) throw new Error('cursor is invalid');

        const [totalCount, items] = await Promise.all([
          ctx.prisma.note.count(),
          ctx.prisma.note.findMany({
            take: first,
            skip: offset,
          }),
        ]);

        return connectionFromArraySlice(
          items,
          { first, after },
          { sliceStart: offset, arrayLength: totalCount }
        );
      },
    });
  },
});
// get Unique Note
export const NoteByIDQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('note', {
      type: 'Note',
      args: { id: nonNull(stringArg()) },
      resolve(_parent, args, ctx) {
        const note = ctx.prisma.note.findUnique({
          where: {
            id: args.id,
          },
        });
        return note;
      },
    });
  },
});

// create note
export const CreateNoteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createNote', {
      type: Note,
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        // const user = await ctx.prisma.user.findUnique({
        //   where: {
        //     email: ctx.user.email,
        //   },
        // });
        //  if (!user || user.role !== 'ADMIN') {
        //   throw new Error(`You do not have permission to perform action`);
        // }
        const newNote = {
          title: args.title,
          body: args.body,
        };

        return await ctx.prisma.note.create({
          data: newNote,
        });
      },
    });
  },
});

// update Note
export const UpdateNoteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateNote', {
      type: 'Note',
      args: {
        id: stringArg(),
        title: stringArg(),
        body: stringArg(),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.note.update({
          where: { id: args.id },
          data: {
            title: args.title,
            body: args.description,
          },
        });
      },
    });
  },
});
// // delete Note
export const DeleteNoteMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('deleteNote', {
      type: 'Note',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.note.delete({
          where: { id: args.id },
        });
      },
    });
  },
});
