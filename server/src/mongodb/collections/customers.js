import { DB } from '../mongoSetup';
import { Long } from 'mongodb';
import resetValidators from './resetValidators';
import checkForExistence from './checkForExistence';

const collName = 'customers';

const schema = {
	type: 'object',
	required: ['identity'],
	properties: {
		groupId: {
			bsonType: 'long',
		},
		groupType: {
			enum: ['homeDelivery', 'collectionDelivery', 'companyDelivery'],
		},
		identity: {
			type: 'object',
			required: ['firstName', 'surName', 'email', 'mobilePhone'],
			properties: {
				firstName: { type: 'string' },
				surName: { type: 'string' },
				birthDate: { bsonType: 'date' },
				email: { type: 'string' },
				classicPhone: { type: 'string' },
				mobilePhone: { type: 'string' },
				address: {
					type: 'object',
					required: ['street', 'postalCode'],
					properties: {
						street: { type: 'string' },
						additionalInfo: { type: 'string' },
						postalCode: { type: 'string' },
						country: { type: 'string' },
					},
				},
			},
		},
	},
};

export default async () => {
	return Promise.all([
		await checkForExistence(collName),
		await resetValidators(collName),
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
		),
	]);
};

export const customerExample = {
	groupType: 'homeDelivery',
	groupId: Long(2),
	identity: {
		firstName: 'Benjamin',
		surName: 'Waterlot',
		email: 'test@test.fr',
		mobilePhone: '06 11 11 11 11',
		address: {
			street: "39 rue de l'abbé Groult",
			additionalInfo: '',
			postalCode: '75012',
			country: 'France',
		},
	},
	personalShipping: {
		street: "39 rue de l'abbé Groult",
		additionalInfo: '',
		postalCode: '75012',
		country: 'France',
	},
};
