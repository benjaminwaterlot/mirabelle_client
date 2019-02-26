import { DB } from '../mongoSetup';
import resetValidators from './resetValidators';
import checkForExistence from './checkForExistence';

const collName = 'products';

const schema = {
	type: 'object',
	required: ['label', 'description', 'origin', 'ref', 'price'],
	properties: {
		_id: { bsonType: 'objectId' },
		description: { type: 'string' },
		label: { type: 'string' },
		origin: { type: 'string' },
		price: {
			bsonType: 'long',
			minimum: 0,
			maximum: 100000,
			description:
				'The price of the product. Is an integer, expressed in cents.',
		},
		ref: { type: 'string' },
	},
};

export default async () => {
	await checkForExistence(collName);
	await resetValidators(collName);
	await DB.command({
		collMod: collName,
		validator: { $jsonSchema: schema },
		validationLevel: 'moderate',
	});
	console.debug(`✓ Validated collection [${collName}].`);
};
