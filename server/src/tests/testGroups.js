import faker from '../database/faker';
import groupTypes from '../database/generic/groupTypes';
const _ = require('lodash');

export default async Group => {
	const fakeGroups = [];
	for (const i of _.range(4)) {
		fakeGroups[i] = Group.create({
			groupId: i,
			groupType: faker.random.arrayElement(groupTypes),
		});
	}
	return await Promise.all(fakeGroups);
};
