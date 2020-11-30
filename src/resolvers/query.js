// Provide resolver functions for our schema fields
module.exports = {
  notes: async (parent, args, { models }) => { // modulo para hacer consulta  
    return await models.Note.find();
  },
  note: async (parent, args, { models }) => {
    return await models.Note.findById(args.id); // modulo para hacer consulta 
  },
};
