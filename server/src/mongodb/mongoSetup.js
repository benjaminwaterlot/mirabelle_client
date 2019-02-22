const MongoClient = require('mongodb').MongoClient

let DB;
let CUSTOMERS;
let PRODUCTS;
const URL = 'mongodb+srv://benjamin:benjamin@mirabelle-tpfpe.gcp.mongodb.net/?retryWrites=true';

const connectToMongo = () => {
	if (DB) return Promise.resolve(DB)
	console.warn("Opening new connection");
	return MongoClient.connect(URL)
		.then(client => {
			DB = client.db('mirabelle');
			initialize();
		})
}

const initialize = () => {
	CUSTOMERS = DB.collection('clients');
	PRODUCTS = DB.collection('products');
}

export { connectToMongo, DB, CUSTOMERS, PRODUCTS };
