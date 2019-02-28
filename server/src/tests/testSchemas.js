import schemaValidator from '../mongodb/validators/schemaValidator';

import sampleCustomer from './sampleCustomer';
import sampleProduct from './sampleProduct';

export default async () => {
	const tests = [
		{
			type: 'product',
			sample: sampleProduct,
		},
		{
			type: 'customer',
			sample: sampleCustomer,
		},
	];

	for (const test of tests) {
		const testResult = await schemaValidator(test.sample, test.type);
		if (testResult.isValid)
			console.log('✓ Schema test in [bundles]: Success');
		else {
			console.error('✗ Schema test in [bundles]: Error');
			console.error(testResult.message);
		}
	}
};
