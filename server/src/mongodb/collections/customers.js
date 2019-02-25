import { DB } from '../mongoSetup';
import resetValidators from './resetValidators';
import checkForExistence from './checkForExistence';

const collName = 'customers';

const schema = {
	bsonType: 'object',
	required: ['_id', 'identity'],
	properties: {
		_id: {
			bsonType: 'objectId',
		},
		shippingGroup: {
			bsonType: 'string',
		},
		identity: {
			bsonType: 'object',
			required: ['firstName', 'surName', 'email', 'phone'],
			properties: {
				firstName: { bsonType: 'string' },
				surName: { bsonType: 'string' },
				birthDate: { bsonType: 'date' },
				email: { bsonType: 'string' },
				classicPhone: { bsonType: 'string' },
				mobilePhone: { bsonType: 'string' },
				address: {
					bsonType: 'object',
					required: ['street', 'postalCode'],
					properties: {
						street: { bsonType: 'string' },
						additionalInfo: { bsonType: 'string' },
						postalCode: { bsonType: 'string' },
						country: { bsonType: 'string' },
					},
				},
			},
		},
		groupType: {
			enum: ['homeDelivery', 'collectionDelivery', 'companyDelivery'],
		},
		groupId: { bsonType: 'int' },
		personalShipping: {
			bsonType: 'object',
			description:
				'This shipping address is only relevant for `personal` groups.',
			properties: {
				street: { bsonType: 'string' },
				additionalInfo: { bsonType: 'string' },
				postalCode: { bsonType: 'string' },
				country: { bsonType: 'string' },
			},
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
