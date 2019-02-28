const Ajv = require('ajv');
import productSchema from '../schemas/products';
import customerSchema from '../schemas/customers';
import packSchema from '../schemas/packs';
// import bundleSchema from '../schemas/bundles';
// import groupSchema from '../schemas/packs';

export default (documentToValidate, type) => {
	const ajv = new Ajv({ allErrors: true });
	let schema;
	switch (type) {
		case 'product':
			schema = productSchema;
			break;
		case 'customer':
			schema = customerSchema;
			break;
		case 'bundle':
			schema = bundleSchema;
			break;
		case 'pack':
			schema = packSchema;
			break;
		case 'group':
			schema = groupSchema;
			break;
		default:
			return {
				isValid: false,
				message: `ERROR : Unknown schema type : >${type}<`,
			};
	}
	const validation = ajv.validate(schema, documentToValidate);
	return { isValid: validation, message: ajv.errorsText(validation.errors) };
};
