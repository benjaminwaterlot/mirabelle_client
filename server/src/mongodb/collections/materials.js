import { DB } from '../mongoSetup';
import resetValidators from './resetValidators';
import checkForExistence from './checkForExistence';

const collName = 'materials';

const schema = {
	bsonType: 'object',
	required: ['_id', 'description', 'label', 'ref', 'origin', 'bio'],
	properties: {
		_id: {
			bsonType: 'objectId',
		},
		label: {
			bsonType: 'string',
		},
		description: {
			bsonType: 'string',
		},
		ref: {
			bsonType: 'string',
		},
		origin: {
			bsonType: 'string',
		},
		bio: {
			bsonType: 'bool',
		},
	},
};

export default async () => {
	await checkForExistence(collName);
	await resetValidators(collName);
	await DB.command(
		{
			collMod: collName,
			validator: {
				$jsonSchema: schema,
			},
			validationLevel: 'moderate',
		},
		(err, res) => {
			if (err) console.error(err);
			else console.debug(`✓ Validated collection [${collName}].`);
		},
	);
};
