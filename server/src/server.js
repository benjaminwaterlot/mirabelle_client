const express = require('express');
const mongoClient = require('./mongodb/mongoSetup')
const addClient = require('./mongodb/customers').addClient

const { ApolloServer, gql } = require('apollo-server-express');

mongoClient.connect(err => {
	console.log("Database connected");
	if (err)
		throw err;
	mongoClient.db('mirabelle').collection('clients').find().toArray(function (err, result) {
		if (err) {
			throw err;
		}
		console.log(result);
	});
});

addClient(5, 'test');

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
    }
    type Mutation {
        addCustomer(id: Int, name: String): Client
        deleteCustomer(id: Int, name: String): Client
    }
`;

let customers = [
	{
		id: 1,
		name: "Benjamin",
	},
	{
		id: 2,
		name: "Rodolphe",
	},
	{
		id: 3,
		name: "Antoine",
	},
]

const resolvers = {
	Query: {
		clients: () => customers,
		client: (parent, { id, name }) => {
			console.log(parent);
			if (id) return customers[id];
			if (name) return customers.find((customer) => customer.name == name);
		},
		helloWorld: () => "Hello World!",
	},
	Mutation: {
		addCustomer: (parent, { name }) => {
			const last_id = customers[customers.length - 1].id
			customers = [...customers, { id: last_id + 1, name: name }];
			return customers[customers.length - 1];
		},
		deleteCustomer: (parent, { id, name }) => {
			let removed
			console.log("parent is " + parent);
			if (id && name) return Error("CA VA PAS");
			if (id) {
				removed = customers.find(customer => customer.id === id);
				customers = customers.filter(customer => customer.id !== id);
			}
			else if (name) {
				removed = customers.find(customer => customer.name === name);
				customers = customers.filter(customer => customer.name !== name);
			}
			else console.error("WOAOUH");
			return removed;
		}
	}
};

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => console.log('Server ready ! 🚀'));
