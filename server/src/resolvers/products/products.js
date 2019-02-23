const { gql } = require('apollo-server-express');

const productSchema = gql`
	type Product {
		name: String
		description: String
		image_src: String
		origin: String
		price: Int
	}
`;

export { productSchema };
