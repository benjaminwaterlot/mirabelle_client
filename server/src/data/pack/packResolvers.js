import { BUNDLES } from '../../mongodb/mongoSetup';

export default {
	Query: {
		getPacks: async (obj, args, context) => {
			return BUNDLES.find().toArray();
		},
	},
};
