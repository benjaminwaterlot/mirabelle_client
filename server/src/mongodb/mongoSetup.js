const MongoClient = require('mongodb').MongoClient;

let DB;
let CUSTOMERS;
let PRODUCTS;
let MATERIALS;
const URL =
	'mongodb+srv://benjamin:benjamin@mirabelle-tpfpe.gcp.mongodb.net/?retryWrites=true';

const connectToMongo = () => {
	if (DB) return Promise.resolve(DB);
	console.warn('Opening new connection');
	return MongoClient.connect(URL).then(client => {
		DB = client.db('mirabelle');
		initialize();
	});
};

const initialize = () => {
	CUSTOMERS = DB.collection('customers');
	PRODUCTS = DB.collection('products');
	MATERIALS = DB.collection('materials');
};

export { connectToMongo, DB, CUSTOMERS, PRODUCTS, MATERIALS };
