const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

export default (err, req, res, next) => {
	if (err.code === 'invalid_token') {
		req.user = null;
		return next(err, req);
	}
	return next(err, req);
};
