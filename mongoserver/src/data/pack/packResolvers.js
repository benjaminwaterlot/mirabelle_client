import { PACKS } from '../../mongodb/mongoSetup';

export default {
	Query: {
		getPacks: async (obj, args, context) => {
			return PACKS.find().toArray();
		},
	},
};
