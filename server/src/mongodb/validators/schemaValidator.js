const Ajv = require('ajv');

// SCHEMAS
import productModel from '../../data/product/productModel';
import customerModel from '../../data/customer/customerModel';
import packModel from '../../data/pack/packModel';

const schemas = [
	{
		collection: 'products',
		schema: productModel,
	},
	{
		collection: 'customers',
		schema: customerModel,
	},
	{
		collection: 'packs',
		schema: packModel,
	},
];

const unknownSchemaError = schema => ({
	isValid: false,
	message: `ERROR : Unknown schema type : >${schema.collection}<`,
});

// const validationObject = validation => ;

export default (documentToValidate, type) => {
	const ajv = new Ajv({ allErrors: true });
	const schema = schemas.find(schema => schema.collection === type);

	if (schema === undefined || !schema) return unknownSchemaError;

	const validation = ajv.validate(schema.schema, documentToValidate);

	return {
		isValid: validation,
		message: ajv.errorsText(validation.errors) + '\n',
	};
};
