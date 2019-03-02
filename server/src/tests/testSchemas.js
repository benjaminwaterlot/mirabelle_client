import schemaValidator from '../mongodb/validators/schemaValidator';

import sampleCustomer from './sampleCustomer';
import sampleProduct from './sampleProduct';

const tests = [
	{
		collection: 'products',
		sample: sampleProduct,
	},
	{
		collection: 'customers',
		sample: sampleCustomer,
	},
];

export default async () => {
	for (const test of tests) {
		const testResult = await schemaValidator(test.sample, test.collection);
		if (testResult.isValid)
			console.log(`✓ Schema test in [${test.collection}]: Success`);
		else {
			console.error(`✗ Schema test in [${test.collection}]: Error`);
			console.error(testResult.message);
		}
	}
};
