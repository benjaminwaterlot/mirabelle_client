export default {
	Query: {
		getWikis: async (obj, args, context) => {
			console.log(context);
			return context.db.models.wikis.findAll({});
		},
	},
};
