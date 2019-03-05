import checkForExistence from '../collections/checkForExistence';

export default () => {
	const collections = ['packs', 'customers', 'packs', 'products', 'groups'];
	for (const collection of collections) {
		checkForExistence(collection);
	}
};
