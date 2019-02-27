import { PRODUCTS } from '../../mongodb/mongoSetup';

const { gql } = require('apollo-server-express');

const productSchemas = gql`
	type Product {
		label: String
		description_short: String
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
		getProducts: () => PRODUCTS.find().toArray(),
	},
};

export { productSchemas, productResolvers };
