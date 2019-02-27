const express = require('express');
const _ = require('lodash');
const { ApolloServer, gql } = require('apollo-server-express');

import { connectToMongo } from './mongodb/mongoSetup';
import resolvers from './resolvers/resolvers';
import schemas from './resolvers/schemas';
import testDB from './tests/testDB';

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

(async () => {
	await connectToMongo();
	console.debug('\nUpdating validators...');
	await testDB();
	app.listen({ port: 4000 }, () => console.log('\nServer ready ! 🚀'));
})();

process.on('unhandledRejection', reason => {
	console.error('Unhandled promise rejection:', reason);
	process.exit(1);
});
