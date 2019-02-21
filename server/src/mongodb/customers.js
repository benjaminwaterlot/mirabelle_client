const mongoClient = require('./mongoSetup')

module.exports.addClient = (id, name) => {
	mongoClient.connect(err => {
		if (err) throw err;
		(async () => {
			const customers = mongoClient.db('mirabelle').collection('clients');
			const insertClient = await customers.insertOne({id, name});
			console.log(insertClient.insertedId);
			const getClientsCount = await customers.countDocuments();
			console.log(getClientsCount);
		})()
	})
}

module.exports.clearCustomers = () => {
	mongoClient.connect(err => {
		if (err) throw err;
		(async () => {
			const customers = mongoClient.db('mirabelle').collection('clients');
			// const clearCustomers = await customers.remo;
			console.log(getClientsCount);
		})()
	})
}