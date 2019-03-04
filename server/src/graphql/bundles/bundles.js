import { BUNDLES } from '../../mongodb/mongoSetup';

const { gql } = require('apollo-server-express');

const productSchemas = gql`
	type Bundle {
		label: String
		description_short: String
		image_src: String
		origin: String
		price: Int
	}
	extend type Query {
		getBundles: [Bundle] @auth(requires: ADMIN)
	}
`;

const productResolvers = {
	Query: {
		getBundles: (obj, args, context) => {
			return BUNDLES.find().toArray();
		},
	},
};

export { productSchemas, productResolvers };
