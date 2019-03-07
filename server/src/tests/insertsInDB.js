const _ = require('lodash');

import faker from '../database/faker';
import groupTypes from '../database/generic/groupTypes';

export default async (db, { Group, Customer }) => {
	const fakeGroups = [];
	for (const i of _.range(4)) {
		fakeGroups[i] = Group.create({
			groupId: i,
			groupType: faker.random.arrayElement(groupTypes),
		});
	}
	const allGroups = await Promise.all(fakeGroups);

	const fakeCustomers = [];
	for (const i of _.range(10)) {
		fakeCustomers[i] = Customer.create({
			surName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			groupType: faker.random.arrayElement(groupTypes),
			birthDate: Math.random() > 0.8 ? null : faker.date.past(),
		});
	}
	const allCustomers = await Promise.all(fakeCustomers);

	const setGroups = [];
	for (const [index, customer] of allCustomers.entries()) {
		setGroups[index] = customer.setGroup(
			faker.random.arrayElement(allGroups),
		);
	}
	await Promise.all(setGroups);
};
