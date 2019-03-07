const _ = require('lodash');

import { insertCustomers, setCustomerGroups } from './testCustomers';
import { insertGroups } from './testGroups';
import { insertProducts, setProductWikis } from './testProducts';
import { insertWikis } from './testWikis';

export default async db => {
	const allCustomers = await insertCustomers(db.models);
	const allGroups = await insertGroups(db.models);
	await setCustomerGroups(allCustomers, allGroups);

	// const allProducts = await insertProducts(db.models);
	// const allWikis = await insertWikis(db.models);
	// await setProductWikis(allProducts, allWikis);
};
