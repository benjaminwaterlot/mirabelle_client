const S = require('sequelize');

const db = new S(process.env.DATABASE_URL, {
	dialect: 'postgres',
	operatorsAliases: false,
	dialectOptions: {
		ssl: true,
	},
	logging: console.log,
});

export default async () => {
	await db
		.authenticate()
		.catch(err => console.error('CANNOT AUTHENTICATE :\n', err));

	const Customer = db.define('customers', {
		surName: {
			type: S.STRING,
		},
		lastName: {
			type: S.STRING,
		},
	});

	await db.drop();

	await db.sync();

	await Customer.create({ surName: 'Benjamin', lastName: 'Waterlot' });
	await Customer.create({ surName: 'Rodolphe', lastName: 'Brunetti' });

	return new Promise((resolve, reject) => {
		resolve(db);
	});
};
