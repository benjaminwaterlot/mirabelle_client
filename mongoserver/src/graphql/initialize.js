const { gql } = require('apollo-server-express');

// These EMPTY schemas and resolvers are mandatory to "extend" the Query type
// and properly modularize schemas. They are not otherwise used.

const globalTypes = gql`
	directive @auth(
		requires: UserGroup! = GUEST
		personalAccess: Boolean! = false
	) on FIELD_DEFINITION

	enum UserGroup {
		GUEST
		CUSTOMER
		ADMIN
	}

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
