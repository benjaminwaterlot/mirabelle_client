const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

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

export default documentToValidate => {
	// const validation = validate(documentToValidate);
	const validation = Ajv.validate(schema, documentToValidate);
	return { isValid: validation, message: ajv.errorsText(validation.errors) };
};
