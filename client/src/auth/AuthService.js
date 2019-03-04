import auth0 from 'auth0-js';
import EventEmitter from 'eventemitter3';
import router from './../router';
import { clientId } from './creds';

class AuthService {
	authNotifier = new EventEmitter();

	auth0 = new auth0.WebAuth({
		domain: 'basilicetmirabelle.eu.auth0.com',
		clientID: clientId,
		redirectUri: 'http://localhost:8080/login',
		responseType: 'token id_token',
		scope: 'openid profile email',
		audience: 'https://express_server/',
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
		const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

		localStorage.setItem('loggedIn', true);
		localStorage.setItem('idToken', authResult.idToken);
		localStorage.setItem('accessToken', authResult.accessToken);
		localStorage.setItem('expiresAt', expiresAt);
		localStorage.setItem('profile', authResult.idTokenPayload);
		this.authNotifier.emit('authChange', true);
	}

	// Not used at the moment.
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
		localStorage.removeItem('loggedIn');
		localStorage.removeItem('idToken');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('expiresAt');
		localStorage.removeItem('profile');
		this.authNotifier.emit('authChange', false);

		this.auth0.logout({
			returnTo: 'http://localhost:8080/home',
			client_id: clientId,
		});
	}

	getAuthenticatedFlag() {
		return localStorage.getItem('loggedIn');
	}

	isAuthenticated() {
		const expiresAt = Number(localStorage.getItem('expiresAt'));
		const timeRemaining = expiresAt - new Date().getTime();
		const remainingMinutes = (timeRemaining / 60000).toFixed(1);
		const authenticatedFlag = this.getAuthenticatedFlag() === 'true';

		if (authenticatedFlag && (!timeRemaining || timeRemaining <= 0)) {
			console.log(
				'Warning ! This session has expired. You are going to be log out.',
			);
			this.logout();
			return false;
		}

		const isAuthenticatedAndFresh = authenticatedFlag && timeRemaining > 0;

		if (isAuthenticatedAndFresh) {
			console.log(`Login valid for ${remainingMinutes} minutes.`);
		}

		return isAuthenticatedAndFresh;
	}
}

export default new AuthService();
