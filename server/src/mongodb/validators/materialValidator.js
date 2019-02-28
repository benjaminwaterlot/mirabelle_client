const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
import schema from '../schemas/products';

export default documentToValidate => {
	const validation = Ajv.validate(schema, documentToValidate);
	return { isValid: validation, message: ajv.errorsText(validation.errors) };
};
