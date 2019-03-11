import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home';
import Authentication from './views/Authentication';
import PageConcept from './views/PageConcept/PageConcept';
import EspaceClient from './views/EspaceClient/EspaceClient';
import MesInformations from './views/EspaceClient/MesInformations/MesInformations';
import MesCommandes from './views/EspaceClient/MesCommandes/MesCommandes';
import EspaceAccueil from './views/EspaceClient/EspaceAccueil/Accueil';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/login',
			name: 'login',
			component: Authentication,
		},
		{
			path: '/concept',
			name: 'concept',
			component: PageConcept,
		},
		{
			path: '/mon-espace',
			name: 'espaceclient',
			component: EspaceClient,
			children: [
				{
					path: 'accueil',
					component: EspaceAccueil,
				},
				{
					path: 'mes-informations',
					component: MesInformations,
				},
				{
					path: 'mes-commandes',
					component: MesCommandes,
				},
				{ path: '*', redirect: 'accueil' },
			],
		},
		// {
		//   path: '/about',
		//   name: 'about',
		//   // route level code-splitting
		//   // this generates a separate chunk (about.[hash].js) for this route
		//   // which is lazy-loaded when the route is visited.
		//   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		// }
	],
});
