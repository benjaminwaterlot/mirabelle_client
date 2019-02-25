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

connectToMongo().then(async () => {
	await runValidators();
	await testDB();
	app.listen({ port: 4000 }, () => console.log('Server ready ! 🚀'));
});

const testDB = async () => {
	await CUSTOMERS.insertOne(customerExample)
		.then(val => console.log('✓ Insertion test in [customers]: Success'))
		.catch(err => console.log('✗ Insertion test in [customers]: Error'));

	await CUSTOMERS.deleteOne({
		'identity.email': customerExample.identity.email,
	})
		.then(val => console.log('✓ Removal test in [customers]: Success'))
		.catch(err => console.log('✗ Removal test in [customers]: Error'));
};
