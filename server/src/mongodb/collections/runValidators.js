import productValidators from './products';
import customerValidators from './customers';
import materialValidators from './materials';

export default async () => {
	await productValidators();
	await customerValidators();
	await materialValidators();
};
