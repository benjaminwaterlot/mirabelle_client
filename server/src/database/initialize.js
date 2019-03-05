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
		groupType: {
			type: S.ENUM({ values: groupTypes }),
			allowNull: false,
		},
		birthDate: {
			type: S.DATE,
			allowNull: true,
		},
		groupId: {
			type: S.INTEGER,
			// allowNull: false,
		},
	});

	const Group = db.define('groups', {
		groupId: {
			type: S.INTEGER,
			unique: true,
		},
		name: {
			type: S.STRING,
			allowNull: false,
			unique: true,
		},
	});

	await db.sync({ force: true });

	Customer.belongsTo(Group);
	// Group.hasMany(Customer);
	// Group.belongsTo(Customer);
	// Customer.hasOne(Group);
	// Group.belongsTo(Customer);

	const fakeGroups = [];
	for (const i of _.range(4)) {
		fakeGroups[i] = Group.create({
			groupId: i,
			name: faker.hacker.noun().toUpperCase(),
		});
	}
	await Promise.all(fakeGroups);

	const fakeCustomers = [];
	for (const i of _.range(10)) {
		fakeCustomers[i] = Customer.create({
			surName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			// groupId: faker.random.number({ min: 1, max: 12 }),
			groupType: faker.random.arrayElement(groupTypes),
			birthDate: Math.random() > 0.8 ? null : faker.date.past(),
		});
	}
	await Promise.all(fakeCustomers);

	for (const customer of fakeCustomers) {
		await customer.setGroup(fakeGroups[1]);
	}

	const numberOfCustomers = await Customer.count();
	console.log(`${numberOfCustomers} customers in table.`);

	return new Promise((resolve, reject) => {
		resolve(db);
	});
};
