const express = require('express');

import middleware_cors from './middlewares/middleware_cors';
import middleware_jwt from './middlewares/middleware_jwt';
import middleware_jwt_invalid from './middlewares/middleware_jwt_invalid';

import apolloServer from './graphql/apolloServerConfig';
import initializeDB from './database/initialize';
import importFromGSheets from '../standalone/importFromGSheets';

import productsdb from '../standalone/productsdb.json';

const app = express();

// Allow CORS, but only from our front-end VueJS website.
app.use(middleware_cors);

// Parse and verify the accessToken (if any) in the request, coming from Auth0.
app.use(middleware_jwt);

// Allow invalid/expired tokens to still access public resources, like guests.
app.use(middleware_jwt_invalid);

// Create our back-end GraphQL server, and store in it user's roles and customerId.
apolloServer.applyMiddleware({ app });

// Launch the server
(async () => {
	console.log('✪ Connection has been established successfully.');

	const db = await initializeDB();

	// console.log(await db.models.Customer.count());
	console.log(await db.models.customers.count());

	// const productsFromGSheets = await importFromGSheets();
	// console.log('We will insert this: ', productsFromGSheets.products[0]);
	// console.log(productsFromGSheets.products.length);
	db.models.products.bulkCreate(productsdb);

	app.listen({ port: 4000 }, () => console.debug('\n✪ Server ready ! 🚀'));
})();

// Catch unhandled errors and log them, then restart NodeJS.
process.on('unhandledRejection', reason => {
	console.error(
		'\n\n\n🔥🔥🔥   ERROR: APP WILL STOP NOW.  🔥🔥🔥 \n\n\n',
		reason,
	);
	process.exit(1);
});
