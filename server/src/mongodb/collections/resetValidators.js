import { DB } from './../mongoSetup';

export default async collection => {
	await DB.command({
		collMod: collection,
		validator: {},
		validationLevel: 'off',
	});
};
