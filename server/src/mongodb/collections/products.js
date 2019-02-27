import { DB, PRODUCTS } from '../mongoSetup';
import resetValidators from './resetValidators';
import checkForExistence from './checkForExistence';
// import ajv from 'ajv';
// var Ajv = require('ajv');

const collName = 'products';

const schema = {
	type: 'object',
	required: ['label', 'description', 'origin', 'ref', 'price'],
	properties: {
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
	const validationErrors = await PRODUCTS.find({
		$nor: [{ $jsonSchema: schema }],
	}).toArray();
	// if (validationErrors.length > 0)
	// 	console.debug(
	// 		`✗ These fields in collection ${collName} failed validation: \n`,
	// 		validationErrors,
	// 	);
	console.debug(`✓ Validated collection [${collName}].`);
};

// export const productInsert = product => {
// 	var ajv = new Ajv();
// 	console.log(
// 		`Does this product pass validation ? ${ajv.validate(schema, product)}`,
// 	);
// };
