import { DB } from '../mongoSetup';

export default async () => {
	DB.command(
		{
			collMod: 'products',
			validator: {
				$jsonSchema: {
					bsonType: 'object',
					required: [
						'name',
						'description',
						'origin',
						'image_src',
						'price',
					],
					additionalProperties: false,
					properties: {
						_id: {
							bsonType: 'objectId',
						},
						name: {
							bsonType: 'string',
						},
						description: {
							bsonType: 'string',
						},
						origin: {
							bsonType: 'string',
						},
						price: {
							bsonType: 'int',
							minimum: 0.0,
							maximum: 100000.0,
							description:
								'The price of the product. Is an integer, expressed in cents.',
						},
					},
				},
			},
			validationLevel: 'strict',
		},
		(err, res) => {
			if (err) console.error(err);
			else console.debug(`✓ Validated collection [products].`);
		},
	);
};
