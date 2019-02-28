import checkForExistence from '../collections/checkForExistence';

export default () => {
	const collections = ['bundles', 'customers', 'packs'];
	for (const collection of collections) {
		checkForExistence(collection);
	}
};
