import checkForExistence from '../collections/checkForExistence';

export default () => {
	const collections = ['bundles', 'customers', 'packs', 'products', 'groups'];
	for (const collection of collections) {
		checkForExistence(collection);
	}
};
