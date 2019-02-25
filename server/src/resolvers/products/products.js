const { gql } = require('apollo-server-express');

import getProducts from '../../mongodb/getProducts';

const productSchemas = gql`
	type Product {
		name: String
		description: String
		image_src: String
		origin: String
		price: Int
	}
	extend type Query {
		getProducts: [Product]
	}
`;

const productValidator = {
	$jsonSchema: {
		type: 'object',
		required: [],
		properties: {
			name: { type: ['string'] },
			description: { type: ['string'] },
			name: { type: ['string'] },
		},
	},
};

const productResolvers = {
	Query: {
		getProducts: () => {
			return getProducts();
		},
	},
};

export { productSchemas, productResolvers };
