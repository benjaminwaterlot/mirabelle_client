import { DB } from './../mongoSetup';

export default async nameToCheck => {
	const collections = await DB.listCollections().toArray();

	const exists = collections.find(coll => coll.name === nameToCheck);

	if (!exists) {
		const createdCollection = await DB.createCollection(nameToCheck)
			.then(data => console.debug(`✓ Created collection ${nameToCheck}.`))
			.catch(err =>
				console.error(
					`✗ Error : creating collection ${nameToCheck} FAILED.`,
				),
			);
	}
};
