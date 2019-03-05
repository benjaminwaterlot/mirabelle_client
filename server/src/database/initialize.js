const S = require('sequelize');
const _ = require('lodash');

import faker from './faker';

const groupTypes = ['HOME', 'SHIPPING_POINT', 'COMPANY'];

const db = new S(process.env.DATABASE_URL, {
	dialect: 'postgres',
	operatorsAliases: false,
	dialectOptions: {
		ssl: true,
	},
});

export default async () => {
	await db
		.authenticate()
		.catch(err => console.error('CANNOT AUTHENTICATE :\n', err));

	const Customer = db.define('customers', {
		surName: {
			type: S.STRING,
			allowNull: false,
		},
		lastName: {
			type: S.STRING,
			allowNull: false,
		},
		groupId: {
			type: S.INTEGER,
			allowNull: false,
		},
		groupType: {
			type: S.ENUM({ values: groupTypes }),
			allowNull: false,
		},
		birthDate: {
			type: S.DATE,
			allowNull: true,
		},
	});

	await db.drop();

	await db.sync();

	const creations = [];

	for (const i of _.range(10)) {
		creations[i] = Customer.create({
			surName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			groupId: faker.random.number({ min: 1, max: 12 }),
			groupType: faker.random.arrayElement(groupTypes),
			birthDate: Math.random() > 0.8 ? null : faker.date.past(),
		});
	}

	await Promise.all(creations);

	const numberOfCustomers = await Customer.count();
	console.log(numberOfCustomers, ' customers in table.');

	return new Promise((resolve, reject) => {
		resolve(db);
	});
};
