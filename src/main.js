import Vue from 'vue';
import './styles/main.styl';
import './plugins/vuetify';
import Vuetify from 'vuetify';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import ApolloClient from 'apollo-boost';

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
		const accessToken = localStorage.getItem('accessToken');
		const authToken = accessToken ? `Bearer ${accessToken}` : null;

		if (accessToken) {
			request.setContext({
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
