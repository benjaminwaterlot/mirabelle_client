const express = require('express');
const _ = require('lodash');
const { ApolloServer } = require('apollo-server-express');

import { connectToMongo } from './mongodb/mongoSetup';
import { globalResolvers, globalTypes } from './graphql/initialize';
import resolvers from './graphql/resolvers';
import schemas from './graphql/schemas';
import testSchemas from './tests/testSchemas';
import createCollections from './mongodb/initialize/createCollections';

const server = new ApolloServer({
	typeDefs: [globalTypes, schemas],
	resolvers: _.merge(globalResolvers, resolvers),
});

const app = express();

server.applyMiddleware({ app });

(async () => {
	console.debug('\n✪ Connecting to MongoDB...');
	await connectToMongo();
	console.debug('\n✪ Initializing collections...');
	await createCollections();
	console.debug('\n✪ Testing schemas...');
	await testSchemas();
	console.debug('\n✪ Launching server...');
	app.listen({ port: 4000 }, () => console.log('\n✪ Server ready ! 🚀'));
})();

process.on('unhandledRejection', reason => {
	console.error('Unhandled promise rejection:', reason);
	process.exit(1);
});
