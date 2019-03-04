const { gql } = require('apollo-server-express');

export default gql`
	type Pack {
		label: String
		description_short: String
		image_src: String
		origin: String
		price: Int
	}
	extend type Query {
		getPacks: [Pack] @auth(requires: ADMIN)
	}
`;
