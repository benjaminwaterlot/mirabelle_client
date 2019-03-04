import schemaValidator from '../mongodb/validators/schemaValidator';

import sampleCustomer from './sampleCustomer';
import sampleProduct from './sampleProduct';

const collections = [
	{
		collName: 'products',
		samples: sampleProduct,
	},
	{
		collName: 'customers',
		samples: sampleCustomer,
	},
];

export default async () => {
	for (const collection of collections) {
		for (const [index, sample] of collection.samples.entries()) {
			const testResult = await schemaValidator(
				sample,
				collection.collName,
			);
			if (testResult.isValid)
				console.log(
					`✓ Schema test ${index} in [${
						collection.collName
					}]: Success`,
				);
			else {
				console.error(
					`✗ Schema test ${index} in [${collection.collName}]: Error`,
				);
				console.error(testResult.message);
			}
		}
	}
};
