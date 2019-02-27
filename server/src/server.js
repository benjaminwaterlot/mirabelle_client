const express = require('express');
const _ = require('lodash');
const { ApolloServer } = require('apollo-server-express');

import { connectToMongo } from './mongodb/mongoSetup';
import { globalResolvers, globalTypes } from './graphql/initialize';
import resolvers from './graphql/resolvers';
import schemas from './graphql/schemas';
import testDB from './tests/testDB';

const server = new ApolloServer({
	typeDefs: [globalTypes, schemas],
	resolvers: _.merge(globalResolvers, resolvers),
});

const app = express();

server.applyMiddleware({ app });

(async () => {
	await connectToMongo();
	console.debug('\nTesting schemas...');
	await testDB();
	app.listen({ port: 4000 }, () => console.log('\nServer ready ! 🚀'));
})();

process.on('unhandledRejection', reason => {
	console.error('Unhandled promise rejection:', reason);
	process.exit(1);
});
