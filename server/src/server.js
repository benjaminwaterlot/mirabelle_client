const express = require('express');
const lodash = require('lodash');

import { connectToMongo } from './mongodb/mongoSetup';
import getProducts from './mongodb/getProducts';
// import { addCustomer } from './mongodb/customers';
import resolvers from './resolvers/resolvers';
import schemas from './resolvers/schemas';

const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
	type Client {
		id: Int
		name: String
		email: String
	}
	type Query {
		clients: [Client]
		client(id: Int, name: String): Client
		helloWorld: String
		getProducts: [Product]
	}
	type Mutation {
		addCustomer(id: Int, name: String): Client
		deleteCustomer(id: Int, name: String): Client
	}
`;

const globalResolvers = {
	Query: {
		getProducts: () => {
			return getProducts();
		},
	},
	Mutation: {},
};

const app = express();

const server = new ApolloServer({
	typeDefs: [typeDefs, schemas],
	resolvers: lodash.merge(globalResolvers),
});
server.applyMiddleware({ app });

connectToMongo().then(() => {
	getProducts();
	app.listen({ port: 4000 }, () => console.log('Server ready ! 🚀'));
});
