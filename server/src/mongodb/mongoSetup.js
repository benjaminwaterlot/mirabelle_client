const MongoClient = require('mongodb').MongoClient;

let DB;
let CUSTOMERS;
let BUNDLES;
let PACKS;
let PRODUCTS;
let GROUPS;
const URL =
	'mongodb+srv://benjamin:benjamin@mirabelle-tpfpe.gcp.mongodb.net/?retryWrites=true';

const connectToMongo = () => {
	if (DB) return Promise.resolve(DB);

	return MongoClient.connect(URL).then(client => {
		DB = client.db('mirabelle');
		initialize();
	});
};

const initialize = () => {
	CUSTOMERS = DB.collection('customers');
	BUNDLES = DB.collection('bundles');
	PACKS = DB.collection('packs');
	PRODUCTS = DB.collection('products');
	GROUPS = DB.collection('groups');
};

export { connectToMongo, DB, CUSTOMERS, BUNDLES, PACKS, PRODUCTS, GROUPS };
