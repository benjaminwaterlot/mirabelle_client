import Vue from 'vue';
import './plugins/overrides.styl';
import './plugins/vuetify';
import Vuetify from 'vuetify';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import ApolloClient from 'apollo-boost';
import AuthService from './auth/AuthService';

const apolloClient = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	request: async original => {
		const accessToken = localStorage.getItem('accessToken');
		const authToken = accessToken
			? `Bearer ${localStorage.getItem('accessToken')}`
			: null;
		console.log(authToken ? authToken : `NOT CREDENTIALS SENT IN HEADERS.`);
		if (accessToken) {
			original.setContext({
				headers: {
					authorization: authToken,
				},
			});
		}
	},
});

Vue.config.productionTip = false;
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
});

Vue.use(Vuetify, {
	theme: {
		primary: '#719125',
		secondary: '#f89c73',
		lightaccent: '#e2dbc9',
		darkaccent: '#484848',
		accent: '#8c9eff',
		error: '#b71c1c',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FFC107',
		light: '#FAF8F0',
	},
});

new Vue({
	router,
	apolloProvider,
	render: h => h(App),
}).$mount('#app');
