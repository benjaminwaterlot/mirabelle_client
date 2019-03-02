const Ajv = require('ajv');

// SCHEMAS
import productSchema from '../schemas/products';
import customerSchema from '../schemas/customers';
import packSchema from '../schemas/packs';

const schemas = [
	{
		collection: 'products',
		schema: productSchema,
	},
	{
		collection: 'customers',
		schema: customerSchema,
	},
	{
		collection: 'packs',
		schema: packSchema,
	},
];

const unknownSchemaError = schema => ({
	isValid: false,
	message: `ERROR : Unknown schema type : >${schema.collection}<`,
});

const validationObject = validation => ({
	isValid: validation,
	message: ajv.errorsText(validation.errors) + '\n',
});

export default (documentToValidate, type) => {
	const ajv = new Ajv({ allErrors: true });
	const schema = schemas.find(schema => schema.type === type);

	if (!schema) return unknownSchemaError;

	const validation = ajv.validate(schema.schema, documentToValidate);

	return validation;
};
