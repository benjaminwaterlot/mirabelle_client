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

const productResolvers = {
	Query: {
		getProducts: () => {
			return getProducts();
		},
	},
};

export { productSchemas, productResolvers };
