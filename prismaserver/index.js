const { prisma } = require('./generated/prisma-client');

// A `main` function so that we can use async/await
async function main() {
	const newUser = await prisma.createUser({ name: 'benj' });
	console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`);
	console.log(`All users: `, await prisma.users());

	// Read all users from the database and print them to the console
	// const allUsers = await prisma.users();
	// console.log(allUsers);
}

main().catch(e => console.error(e));
