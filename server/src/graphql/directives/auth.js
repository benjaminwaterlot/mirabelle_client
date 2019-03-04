const {
	SchemaDirectiveVisitor,
	AuthenticationError,
} = require('apollo-server');

const isPersonalAccount = (personalAccess, root, user) => {
	return personalAccess && root.customerId === user.customerId;
};

const hasRequiredRole = (user, requires) => {
	return user.roles.includes(requires);
};

export default class AuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const { resolve = defaultFieldResolver } = field;
		const { requires, personalAccess } = this.args;

		field.resolve = async function(root, args, context, info) {
			const user = context.user;

			// User is not logged in (or have no role, which shouldn't happen).
			if (!user || !user.roles) {
				throw new AuthenticationError(
					'You must be signed in to view this resource.',
				);
			}

			// User is authorized, complete the query / mutation.
			else if (
				isPersonalAccount(personalAccess, root, user) ||
				hasRequiredRole(user, requires)
			) {
				console.debug(
					`▻ User with id ${user.customerId} [${
						user.roles
					}] has been granted access to query ${info.fieldName}`,
				);
				const result = await resolve.apply(this, args);
				return result;
			}

			// User has roles, but not the requested one.
			else {
				throw new AuthenticationError(
					`Not authorized: You should be at least ${requires} ${
						personalAccess ? ' or be the concerned customer.' : null
					}`,
				);
			}
		};
	}
}
