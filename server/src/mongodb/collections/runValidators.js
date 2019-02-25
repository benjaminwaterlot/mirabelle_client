import products from './products';
import customers from './customers';

export default async () => {
	await products();
	await customers();
};
