import Vue from 'vue';
import './styles/main.styl';
import './plugins/vuetify';
import Vuetify from 'vuetify';
import VueApollo from 'vue-apollo';
import App from './App.vue';
import router from './router';
import ApolloClient from 'apollo-boost';

let appUrl;
if (process.env.NODE_ENV === 'production') {
	appUrl = 'https://basilic-mirabelle.herokuapp.com/graphql';
} else if (process.env.NODE_ENV === 'development') {
	appUrl = 'http://localhost:4000/graphql';
} else throw new Error(`BAD ENVIRONMENT : ${process.env}`);

const apolloClient = new ApolloClient({
	uri: appUrl,
	request: async original => {
		const accessToken = localStorage.getItem('accessToken');
		const authToken = accessToken
			? `Bearer ${localStorage.getItem('accessToken')}`
			: null;

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
