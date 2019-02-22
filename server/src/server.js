const express = require('express');
import { connectToMongo } from './mongodb/mongoSetup'
import getProducts from './mongodb/getProducts'
import { addCustomer } from './mongodb/customers'

const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
    type Client {
        id: Int
		name: String
		email: String
    }
	type Product {
		name: String
		description: String
		image_src: String
		origin: String
		price: Int
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

const resolvers = {
	Query: {
		getProducts: () => {
			return getProducts();
		}
	},
	Mutation: {
	// 	addCustomer: (parent, { name }) => {
	// 		const last_id = customers[customers.length - 1].id
	// 		customers = [...customers, { id: last_id + 1, name: name }];
	// 		return customers[customers.length - 1];
	// 	},
	// 	deleteCustomer: (parent, { id, name }) => {
	// 		let removed
	// 		console.log("parent is " + parent);
	// 		if (id && name) return Error("CA VA PAS");
	// 		if (id) {
	// 			removed = customers.find(customer => customer.id === id);
	// 			customers = customers.filter(customer => customer.id !== id);
	// 		}
	// 		else if (name) {
	// 			removed = customers.find(customer => customer.name === name);
	// 			customers = customers.filter(customer => customer.name !== name);
	// 		}
	// 		else console.error("WOAOUH");
	// 		return removed;
	// 	}
	}
};

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

connectToMongo().then(
	() => {
		getProducts()
		app.listen({ port: 4000 }, () => console.log('Server ready ! 🚀'))
	}
)
