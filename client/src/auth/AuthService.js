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
		this.accessToken = authResult.accessToken;
		this.idToken = authResult.idToken;
		this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

		this.authNotifier.emit('authChange', true);
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
		this.accessToken = null;
		this.idToken = null;
		this.expiresAt = null;
		this.authNotifier.emit('authChange', false);
		localStorage.removeItem('loggedIn');

		this.auth0.logout({
			returnTo: 'http://localhost:8080/home',
			client_id: clientId,
		});
	}

	getAuthenticatedFlag() {
		return localStorage.getItem('loggedIn');
	}

	isAuthenticated() {
		const expiresAt = Number(this.expiresAt);
		const timeRemaining = expiresAt - new Date().getTime();
		const remainingMinutes = (timeRemaining / 60000).toFixed(1);

		if (timeRemaining > 0)
			console.log(`Login valid for ${remainingMinutes} minutes.`);
		return timeRemaining > 0 && this.getAuthenticatedFlag() === 'true';
	}
}

export default new AuthService();
