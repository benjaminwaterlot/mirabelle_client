import { DB } from '../mongoSetup';
import resetValidators from './resetValidators';

const collName = 'customers';

const schema = {
	bsonType: 'object',
	required: ['_id', 'identity'],
	additionalProperties: false,
	properties: {
		_id: {
			bsonType: 'objectId',
		},
		identity: {
			bsonType: 'object',
			required: ['firstName', 'surName', 'email', 'phone'],
			properties: {
				firstName: {
					bsonType: 'string',
				},
				surName: {
					bsonType: 'string',
				},
				birthDate: {
					bsonType: 'date',
				},
				email: {
					bsonType: 'string',
					pattern: '^[^@]+@[^@]+\\.[^@]+$',
				},
				phone: {
					bsonType: 'string',
					pattern: '^\\d{10}$',
				},
			},
		},
		shipping: {
			bsonType: 'object',
			properties: {
				address: {
					bsonType: 'string',
				},
				city: {
					bsonType: 'string',
				},
				postalCode: {
					bsonType: 'string',
					pattern: '^\\d{5}$',
				},
			},
		},
	},
};

export default async () => {
	await resetValidators(collName);
	await DB.command(
		{
			collMod: collName,
			validator: {
				$jsonSchema: schema,
			},
			validationLevel: 'strict',
		},
		(err, res) => {
			if (err) console.error(err);
			else console.debug(`✓ Validated collection [${collName}].`);
		},
	);
};
