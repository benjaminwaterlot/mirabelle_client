import { DB } from '../mongoSetup';
import { Long } from 'mongodb';
import resetValidators from './resetValidators';
import checkForExistence from './checkForExistence';

const collName = 'customers';

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
