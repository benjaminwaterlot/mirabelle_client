const express = require('express');
const _ = require('lodash');
const { ApolloServer, gql } = require('apollo-server-express');

import { connectToMongo } from './mongodb/mongoSetup';
import resolvers from './resolvers/resolvers';
import schemas from './resolvers/schemas';
import runValidators from './mongodb/collections/runValidators';

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

const server = new ApolloServer({
	typeDefs: [globalTypes, schemas],
	resolvers: _.merge(globalResolvers, resolvers),
});

const app = express();

server.applyMiddleware({ app });

connectToMongo().then(() => {
	runValidators();
	app.listen({ port: 4000 }, () => console.log('Server ready ! 🚀'));
});
