const Ajv = require('ajv');

const schema = {
	type: 'object',
	required: ['label', 'description_short', 'origin', 'ref', 'fragility'],
	properties: {
		ref: { type: 'string' },
		label: { type: 'string' },
		description_short: { type: 'string' },
		origin: { type: 'string' },
		fragility: { type: 'string' },
	},
};

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

export default documentToValidate => {
	const validation = validate(documentToValidate);
	return { isValid: validation, message: ajv.errorsText(validate.errors) };
};
