const S = require('sequelize');

import productCategories from '../generic/productCategories';
import productQuantifiers from '../generic/productQuantifiers';

export default db => {
	return db.define('products', {
		ref: {
			type: S.STRING,
			allowNull: false,
			unique: true,
		},
		name: {
			type: S.STRING,
			allowNull: false,
		},
		picture: {
			type: S.STRING,
			allowNull: false,
		},
		origin: {
			type: S.STRING,
			allowNull: true,
		},
		category: {
			type: S.ENUM(productCategories),
			allowNull: false,
		},
		priceHt: {
			type: S.DOUBLE,
			allowNull: true,
		},
		minQuantity: {
			type: S.INTEGER,
			defaultValue: 1,
		},
		quantifier: {
			type: S.ENUM(productQuantifiers),
			allowNull: false,
		},
		weight: {
			type: S.DOUBLE,
			allowNull: false,
		},
		isBio: {
			type: S.BOOLEAN,
			defaultValue: true,
		},
		isLocal: {
			type: S.BOOLEAN,
			defaultValue: false,
		},
		supplyPrice: {
			type: S.DOUBLE,
			allowNull: false,
		},
		supplyQuantifier: {
			type: S.ENUM(productQuantifiers),
			allowNull: false,
		},
		manufacturingQuantifier: {
			type: S.ENUM(productQuantifiers),
		},
		manufacturingSupplier: {
			type: S.STRING,
			allowNull: true,
		},
		manufacturingProcess: {
			type: S.STRING,
			allowNull: true,
		},
		manufacturingLettring: {
			type: S.STRING,
			allowNull: true,
		},
		// TODO: LINK THE PRODUCT WITH HIS WIKI ID.
	});
};
