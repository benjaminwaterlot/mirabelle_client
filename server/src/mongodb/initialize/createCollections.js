import { DB } from '../mongoSetup';
import checkForExistence from '../collections/checkForExistence';

export default async () => {
	const collections = ['bundles', 'customers', 'packs'];
	for (const collection of collections) {
		checkForExistence(collection);
	}
};
