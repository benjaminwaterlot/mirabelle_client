const express = require('express');

import { connectToMongo } from './mongodb/mongoSetup';
import testSchemas from './tests/testSchemas';
import createCollections from './mongodb/initialize/createCollections';

import middleware_cors from './middlewares/middleware_cors';
import middleware_jwt from './middlewares/middleware_jwt';
import middleware_jwt_invalid from './middlewares/middleware_jwt_invalid';

import apolloServer from './graphql/apolloServerConfig';

const app = express();

// Allow CORS, but only from our front-end VueJS website.
app.use(middleware_cors);

// Parse and verify the accessToken (if any) in the request, coming from Auth0.
app.use(middleware_jwt);

// Allow invalid/expired tokens to still access public resources, like guests.
app.use(middleware_jwt_invalid);

// Create our back-end GraphQL server, and store in it user's roles and customerId.
apolloServer.applyMiddleware({ app });

// Launch the server
(async () => {
	console.debug('\n✪ Connecting to MongoDB...');
	await connectToMongo();
	console.debug('\n✪ Initializing collections...');
	await createCollections();
	console.debug('\n✪ Testing schemas with raw data...');
	await testSchemas();
	console.debug('\n✪ Launching server...');
	app.listen({ port: 4000 }, () => console.debug('\n✪ Server ready ! 🚀'));
})();

process.on('unhandledRejection', reason => {
	console.error('Unhandled promise rejection:', reason);
	process.exit(1);
});
