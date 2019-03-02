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
	request: original => {
		console.log(`Bearer ${localStorage.getItem('accessToken')}`);
		return original.setContext({
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`,
			},
		});
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
