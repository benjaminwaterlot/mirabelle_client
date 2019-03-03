<template lang='pug'>
v-toolbar.white.elevation-2(app prominent)
	v-img(src="./logo.png" max-height="70%" contain)
	v-spacer(grow)
	v-toolbar-items
		v-menu(flat v-for="item in items" :key="item.label" bottom offset-y open-on-hover)
			v-btn.darkaccent--text.link(slot="activator" flat) {{ item.label }}
			v-list(v-if="item.dropdown")
				v-list-tile(@click="" v-for="dropdown in item.dropdown" :key="dropdown.label")
					v-list-tile-title {{ dropdown.label }}
	v-divider.ml-2(vertical)
	v-btn(v-if="!isAuthenticated" flat color="primary" @click="authenticate()")
		v-icon(left) account_circle
		span Se connecter
	v-btn(v-else flat color="primary" @click="logout()")
		v-icon(left) account_circle
		span Se déconnecter
	v-btn(color="secondary" fab small flat @click="getStatus()")
		v-icon info
	v-btn(color="secondary" fab small flat @click="updateStatus()")
		v-icon autorenew

</template>

<script>
import auth from "@/auth/AuthService";

export default {
	name: "Navbar",
	methods: {
		authenticate: function() {
			auth.login();
			this.updateStatus();
		},
		logout: function() {
			auth.logout();
			this.updateStatus();
		},
		getStatus: function() {
			console.log("AUTHENTICATION STATUS: ", auth);
			console.log("LOCALSTORAGE CONTENT : ", localStorage);
		},
		updateStatus: function(boolean) {
			this.isAuthenticated = auth.isAuthenticated();
		}
	},
	mounted() {
		// setTimeout(this.updateStatus, 100);
		this.updateStatus();
		console.log(auth);

		auth.authNotifier.on("authChange", (event, listener) => {
			console.log("RECEIVED AN EVENT", event, " and ", listener);
			this.updateStatus();
		});
	},
	data() {
		return {
			isAuthenticated: null,
			authenticated: auth.isAuthenticated(),
			items: [
				{
					label: "Nos supers paniers",
					dropdown: [
						{
							label: "Le super mix",
							link: "/"
						},
						{
							label: "Le super fruitier",
							link: "/"
						},
						{
							label: "Le super légumier",
							link: "/"
						}
					],
					dropdownOpen: false,
					link: "/"
				},
				{
					label: "Nos supers produits",
					dropdown: [
						{
							label: "Fruits",
							link: "/"
						},
						{
							label: "Légumes",
							link: "/"
						},
						{
							label: "Épicerie",
							link: "/"
						}
					],
					dropdownOpen: false,
					link: "/"
				},
				{
					label: "Concept",
					dropdown: null,
					dropdownOpen: false,
					link: "/"
				},
				{
					label: "Nos supers recettes",
					dropdown: null,
					dropdownOpen: false,
					link: "/"
				},
				{
					label: "Livraison",
					dropdown: null,
					dropdownOpen: false,
					link: "/"
				}
			]
		};
	}
};
</script>

<style lang="stylus" scoped>
.link {
	letter-spacing: 0.1em;
	font-weight: 400;
	font-size: 0.9em;
}
</style>
