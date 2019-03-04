const express = require('express');
const _ = require('lodash');
const { ApolloServer } = require('apollo-server-express');

import { connectToMongo } from './mongodb/mongoSetup';
import { globalResolvers, globalTypes } from './graphql/initialize';

import resolvers from './graphql/resolvers';
import schemas from './graphql/schemas';
import testSchemas from './tests/testSchemas';
import createCollections from './mongodb/initialize/createCollections';

import middleware_cors from './middlewares/middleware_cors';
import middleware_jwt from './middlewares/middleware_jwt';
import middleware_jwt_invalid from './middlewares/middleware_jwt_invalid';

const server = new ApolloServer({
	typeDefs: [globalTypes, schemas],
	resolvers: _.merge(globalResolvers, resolvers),
	context: ({ req }) => {
		console.info(`USER IS `, req.user);
		const user = req.user;
		return { user };
	},
});

const app = express();

app.use(middleware_cors);
app.use(middleware_jwt);
app.use(middleware_jwt_invalid);

server.applyMiddleware({ app });

(async () => {
	console.debug('\n✪ Connecting to MongoDB...');
	await connectToMongo();
	console.debug('\n✪ Initializing collections...');
	await createCollections();
	console.debug('\n✪ Testing schemas with raw data...');
	await testSchemas();
	console.debug('\n✪ Launching server...');
	app.listen({ port: 4000 }, () => console.log('\n✪ Server ready ! 🚀'));
})();

process.on('unhandledRejection', reason => {
	console.error('Unhandled promise rejection:', reason);
	process.exit(1);
});
