import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home';
import Authentication from './views/Authentication';
import PageConcept from './views/PageConcept/PageConcept';
import PageLivraison from './views/PageLivraison/PageLivraison';
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
			path: '/livraison',
			name: 'livraison',
			component: PageLivraison,
		},
		{
			path: '/mon-espace',
			component: EspaceClient,
			children: [
				{
					path: '/',
					name: 'espaceclient',
					component: EspaceAccueil,
				},
				{
					path: 'mes-informations',
					name: 'mesinformations',
					component: MesInformations,
				},
				{
					path: 'mes-commandes',
					name: 'mescommandes',
					component: MesCommandes,
				},
			],
		},
		{
			path: '*',
			redirect: '/',
		},
		// { path: '/mon-espace*', redirect: '/mon-espace/accueil' },
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
