const S = require('sequelize');

import getCustomerModel from './customers/customerModel';
import getGroupModel from './groups/groupModel';
import insertsInDB from '../tests/insertsInDB';

const db = new S(process.env.DATABASE_URL, {
	dialect: 'postgres',
	operatorsAliases: false,
	dialectOptions: {
		ssl: true,
	},
});

export default async () => {
	// Authenticate to the db
	await db
		.authenticate()
		.catch(err => console.error('CANNOT AUTHENTICATE :\n', err));

	// Generate the PostgreSQL models.
	const Customer = getCustomerModel(db);
	const Group = getGroupModel(db);

	// Link the models.
	Customer.belongsTo(Group);
	Group.hasMany(Customer);

	// Synchronyze these models with the DB.
	await db.sync({ force: true });

	// Insert fake infos for testing.
	await insertsInDB(db, { Customer, Group });

	// Return the database, which is now queryable.
	return db;
};
