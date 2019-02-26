import productValidators from './products';
import customerValidators from './customers';
import materialValidators from './materials';

export default () => {
	return Promise.all([
		productValidators(),
		customerValidators(),
		materialValidators(),
	]);
};
