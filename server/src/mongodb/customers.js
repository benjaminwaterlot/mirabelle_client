import { CUSTOMERS } from './mongoSetup'

export const addCustomer = async (id, name) => {
	const insertClient = await CUSTOMERS.insertOne({id, name});
	console.log(`Inserted new customer : ${insertClient.insertedId}`);
	console.log(`Current customer count : ${await CUSTOMERS.countDocuments()}`);
}

// export const clearCustomers = async () => {
// 	await Connection.db.collection('clients')
// }

// export async function clearCustomers ()

// module.exports.clearCustomers = () => {
// 	mongoClient.connect(err => {
// 		if (err) throw err;
// 		(async () => {
// 			const customers = mongoClient.db('mirabelle').collection('clients');
// 			// const clearCustomers = await customers.remo;
// 			console.log(getClientsCount);
// 		})()
// 	})
// }