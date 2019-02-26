const express = require('express');
const _ = require('lodash');
const { ApolloServer, gql } = require('apollo-server-express');

import { connectToMongo, DB, CUSTOMERS } from './mongodb/mongoSetup';
import resolvers from './resolvers/resolvers';
import schemas from './resolvers/schemas';
import runValidators from './mongodb/collections/runValidators';
import { customerExample } from './mongodb/collections/customers';

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
	await runValidators();
	console.debug('\nRunning tests...');
	await testDB();
	app.listen({ port: 4000 }, () => console.log('\nServer ready ! 🚀'));
})();

const testDB = async () => {
	await CUSTOMERS.insertOne(customerExample)
		.then(() => console.log('✓ Insertion test in [customers]: Success'))
		.catch(err => console.error('✗ Insertion test in [customers]: ', err));

	const customerEmail = customerExample.identity.email;
	await CUSTOMERS.deleteOne({ 'identity.email': customerEmail })
		.then(() => console.log('✓ Removal test in [customers]: Success'))
		.catch(err => console.error('✗ Removal test in [customers]: ', err));
};

process.on('unhandledRejection', reason => {
	console.error('Unhandled promise rejection:', reason);
	process.exit(1);
});
