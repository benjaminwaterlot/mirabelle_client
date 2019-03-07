const _ = require('lodash');

import { insertCustomers, setCustomerGroups } from './testCustomers';
import insertGroups from './testGroups';
import { insertProducts } from './testProducts';

export default async (db, { Group, Customer, Product }) => {
	const allCustomers = await insertCustomers(Customer);
	const allGroups = await insertGroups(Group);
	const setGroups = await setCustomerGroups(allCustomers, allGroups);
	const allProducts = await insertProducts(db.models);
};
