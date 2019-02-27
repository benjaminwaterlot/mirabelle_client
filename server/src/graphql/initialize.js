const { gql } = require('apollo-server-express');
// These empty schemas and resolvers are mandatory to "extend" the Query type
// and modularize properly schemas. They are not used.

const globalTypes = gql`
	type Query {
		test: String
	}
`;

const globalResolvers = {
	Query: {
		test: () => null,
	},
};

export { globalTypes, globalResolvers };
