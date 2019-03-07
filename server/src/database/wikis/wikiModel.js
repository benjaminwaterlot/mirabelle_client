const S = require('sequelize');

export default db => {
	return db.define('wikis', {
		ref: {
			type: S.STRING,
			unique: true,
			allowNull: false,
		},
		description: {
			type: S.STRING,
			allowNull: false,
		},
		descriptionLong: {
			type: S.STRING,
			allowNull: false,
		},
		fragility: {
			type: S.INTEGER,
			allowNull: false,
		},
		volume: {
			type: S.DOUBLE,
			allowNull: false,
		},
	});
};
