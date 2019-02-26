import { DB, MATERIALS } from '../mongoSetup';
import resetValidators from './resetValidators';
import checkForExistence from './checkForExistence';

const collName = 'materials';

const schema = {
	type: 'object',
	required: ['_id', 'description', 'label', 'ref', 'origin', 'bio'],
	properties: {
		_id: {
			bsonType: 'objectId',
		},
		label: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
		ref: {
			type: 'string',
		},
		origin: {
			type: 'string',
		},
		bio: {
			type: 'boolean',
		},
	},
};

export default async () => {
	await checkForExistence(collName);
	await resetValidators(collName);
	await DB.command({
		collMod: collName,
		validator: {
			$jsonSchema: schema,
		},
		validationLevel: 'moderate',
	});
	const validationErrors = await MATERIALS.find({
		$nor: [{ $jsonSchema: schema }],
	}).toArray();
	console.debug(`✓ Validated collection [${collName}].`);
};
