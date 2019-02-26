import productValidators from './products';
import customerValidators from './customers';
import materialValidators from './materials';

export default async () => {
	return Promise.all([
		await productValidators(),
		await customerValidators(),
		await materialValidators(),
	]);
};
