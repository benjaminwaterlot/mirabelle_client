import Vue from 'vue';
import './styles/main.styl';
import './plugins/vuetify';
import Vuetify from 'vuetify';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import ApolloClient from 'apollo-boost';
import VueCookies from 'vue-cookies';
import tokenGenerator from './helpers/tokenGenerator';

const getServerUrl = env => {
	switch (env.NODE_ENV) {
		case 'production':
			return 'https://basilic-mirabelle.herokuapp.com/graphql';

		case 'development':
			return 'http://localhost:4000/graphql';

		default:
			throw new Error(`BAD ENVIRONMENT : ${env}`);
	}
};

const apolloClient = new ApolloClient({
	uri: getServerUrl(process.env),
	request: async request => {
		// Set the access token when present.
		const accessToken = localStorage.getItem('accessToken');
		const authToken = accessToken ? `Bearer ${accessToken}` : null;

		// Set the id cookie to identify guests too.
		window.$cookies.config('30d');
		if (!window.$cookies.get('identification'))
			window.$cookies.set('identification', tokenGenerator());
		console.info(
			'Identification cookie is :',
			window.$cookies.get('identification'),
		);

		// Generate the headers
		const headers = {
			'x-identification': window.$cookies.get('identification'),
		};
		if (authToken) {
			headers.authorization = authToken;
		}
		request.setContext({ headers });
	},
});

Vue.config.productionTip = false;
Vue.use(VueApollo);
Vue.use(VueCookies);

const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
});

Vue.use(Vuetify, {
	theme: {
		primary: '#719125',
		secondary: '#f89d73',
		lightaccent: '#DECDAD',
		darkaccent: '#474747',
		light: '#f4eee2',
		brown: '#969084',
		yellow: '#FFBC00',
		darkyellow: '#E3AA00',
		accent: '#8c9eff',
		error: '#b71c1c',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FFC107',
	},
});

new Vue({
	router,
	apolloProvider,
	render: h => h(App),
}).$mount('#app');
