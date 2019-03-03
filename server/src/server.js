const express = require('express');
const _ = require('lodash');
const { ApolloServer } = require('apollo-server-express');

import { connectToMongo } from './mongodb/mongoSetup';
import { globalResolvers, globalTypes } from './graphql/initialize';
import resolvers from './graphql/resolvers';
import schemas from './graphql/schemas';
import testSchemas from './tests/testSchemas';
import createCollections from './mongodb/initialize/createCollections';
import { runInNewContext } from 'vm';

const cors = require('cors');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const corsOptions = {
	origin: 'http://localhost:8080',
};

const checkJwt = jwt({
	// Dynamically provide a signing key
	// based on the kid in the header and
	// the signing keys provided by the JWKS endpoint.
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `https://basilicetmirabelle.eu.auth0.com/.well-known/jwks.json`,
	}),

	// Validate the audience and the issuer.
	audience: 'https://express_server/',
	issuer: `https://basilicetmirabelle.eu.auth0.com/`,
	algorithms: ['RS256'],
	credentialsRequired: false,
});

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

app.use(cors(corsOptions));
app.use(checkJwt);

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
