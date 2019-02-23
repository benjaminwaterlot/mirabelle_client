import { PRODUCTS } from './mongoSetup'

export default () => {
	console.log("Querying mongodb for products");
	return PRODUCTS.find({}).toArray();
}