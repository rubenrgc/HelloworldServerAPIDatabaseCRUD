// Provide resolver functions for our schema fields
// Estas son las formas en las que pediremos las consultas
module.exports = {
  notes: async (parent, args, { models }) => {
    // modulo para hacer consulta
    return await models.Note.find();
  },
  note: async (parent, args, { models }) => {
    return await models.Note.findById(args.id); 
    // modulo para hacer consulta
  },

  user: async (parent, { username }, { models }) => {
    // find a user given their username
    return await models.User.findOne({ username });
  },
  users: async (parent, args, { models }) => {
    // find all users
    return await models.User.find({});
  },
  me: async (parent, args, { models, user }) => {
    // find a user given the current user context
    return await models.User.findById(user.id);
  },

    // Resolve the author info for a note when requested
  author: async (note, args, { models }) => {
  return await models.User.findById(note.author);
  },
    // Resolved the favoritedBy info for a note when requested
  favoritedBy: async (note, args, { models }) => {
  return await models.User.find({ _id: { $in: note.favoritedBy } });
  }

};

