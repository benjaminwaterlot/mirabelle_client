import productValidator from '../mongodb/validators/productValidator';
import customerValidator from '../mongodb/validators/customerValidator';

const sampleCustomer = {
	groupType: 'homeDelivery',
	groupId: 2,
	identity: {
		firstName: 'Benjamin',
		surName: 'Waterlot',
		email: 'test@test.fr',
		mobilePhone: '06 11 11 11 11',
		address: {
			street: "39 rue de l'abbé Groult",
			additionalInfo: '',
			postalCode: '75012',
			country: 'France',
		},
	},
};

export default async () => {
	const sampleProduct = {
		label: 'TestProduct',
		description: 'TestDescription',
		origin: 'TestCountry',
		price: 42,
		ref: 'TESTREF',
	};
	const validateProducts = await productValidator(sampleProduct);
	if (validateProducts.isValid)
		console.log('✓ Schema test in [products]: Success');
	else {
		console.error('✗ Schema test in [products]: Error');
		console.error(validateProducts.message);
	}
	const validateCustomer = await customerValidator(sampleCustomer);
	if (validateCustomer.isValid)
		console.log('✓ Schema test in [customers]: Success');
	else {
		console.error('✗ Schema test in [customers]: Error');
		console.error(validateCustomer.message);
	}
};
