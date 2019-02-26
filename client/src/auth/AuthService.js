import auth0 from 'auth0-js';
import EventEmitter from 'eventemitter3';
import router from './../router';
import { clientId } from './creds';

// class AuthService {
// 	auth0 = new auth0.WebAuth({
// 		domain: 'basilicetmirabelle.eu.auth0.com',
// 		clientID: 'a6K3NZlBCo33nUEQUFtzgTObbrgdyX1W',
// 		redirectUri: 'http://localhost:8080/login',
// 		responseType: 'token id_token',
// 		scope: 'openid',
// 	});

// 	login() {
// 		this.auth0.authorize();
// 	}
// }

class AuthService {
	accessToken;
	idToken;
	expiresAt;
	authenticated = this.isAuthenticated();
	authNotifier = new EventEmitter();

	auth0 = new auth0.WebAuth({
		domain: 'basilicetmirabelle.eu.auth0.com',
		clientID: clientId,
		redirectUri: 'http://localhost:8080/login',
		responseType: 'token id_token',
		scope: 'openid',
	});

	login() {
		this.auth0.authorize();
	}

	handleAuthentication() {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
				router.replace('home');
			} else if (err) {
				router.replace('home');
				console.log(err);
			}
		});
	}

	setSession(authResult) {
		// this.accessToken = authResult.accessToken;
		// this.idToken = authResult.idToken;
		// this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

		this.authNotifier.emit('authChange', { authenticated: true });
		localStorage.setItem('loggedIn', true);

		// MY VERSION OF AUTHENTICATION THERE
		localStorage.setItem('accessToken', authResult.accessToken);
		localStorage.setItem('idToken', authResult.idToken);
		localStorage.setItem(
			'expiresAt',
			authResult.expiresIn * 1000 + new Date().getTime(),
		);
		localStorage.setItem('loggedIn', true);
	}

	renewSession() {
		this.auth0.checkSession({}, (err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
			} else if (err) {
				this.logout();
				console.log(err);
			}
		});
	}

	logout() {
		// Clear access token and ID token from local storage
		// this.accessToken = null;
		// this.idToken = null;
		// this.expiresAt = null;

		// this.userProfile = null;
		this.authNotifier.emit('authChange', false);

		localStorage.removeItem('loggedIn');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('idToken');
		localStorage.removeItem('expiresAt');

		// navigate to the home route
		router.replace('home');
	}

	getAuthenticatedFlag() {
		return localStorage.getItem('loggedIn');
	}

	isAuthenticated() {
		// return (
		// 	new Date().getTime() < this.expiresAt &&
		// 	this.getAuthenticatedFlag() === 'true'
		// );
		// MY VERSION OF AUTHENTICATION HERE
		console.log(
			'expires in :',
			(
				(Number(localStorage.getItem('expiresAt')) -
					new Date().getTime()) /
				1000 /
				60
			).toFixed(1) + ' minutes',
		);
		console.log('is loggedin :', this.getAuthenticatedFlag() === 'true');
		return (
			new Date().getTime() < localStorage.getItem('expiresAt') &&
			this.getAuthenticatedFlag() === 'true'
		);
	}
}

export default new AuthService();
