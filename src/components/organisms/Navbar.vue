<template lang='pug'>
v-toolbar.white.elevation-2(app prominent style="z-index: 1000;")
	router-link(to="/")
		v-img.ma-0(src="./logo.png" height="50px" width="140px" contain)
	v-spacer(grow)
	v-toolbar-items.mr-2.hidden-sm-and-down
		v-menu(flat v-for="item in items" :key="item.label" bottom offset-y open-on-hover)
			v-btn.darkaccent--text.link(:to="item.link === `/` ? `` : item.link" slot="activator" flat) {{ item.label }}
			v-list(v-if="item.dropdown")
				v-list-tile(@click="" v-for="dropdown in item.dropdown" :key="dropdown.label")
					v-list-tile-title {{ dropdown.label }}
	v-btn.mr-3(depressed color="primary lighten-1" @click="")
		v-badge(color="secondary")
			v-icon(left) shopping_basket
			span.ly.font-weight-bold 14,50€
			template(v-slot:badge)
				span.white--text.caption.font-weight-black 3
	v-divider(vertical)
	v-btn(v-if="!isAuthenticated" flat color="darkaccent" @click="authenticate()")
		v-icon(left) account_circle
		span.ly Mon espace
	v-btn.hidden-md-and-down.ml-4(v-if="isAuthenticated" flat color="darkaccent" :to="{name: 'espaceclient'}")
		v-icon(left) face
		span.ly Mon espace
	v-btn.hidden-lg-and-up.ml-4(v-if="isAuthenticated" fab small flat color="darkaccent" :to="{name: 'espaceclient'}")
		v-icon(medium) face
</template>

<script>
import auth from "@/auth/AuthService";

export default {
	name: "Navbar",
	props: {
		isAuthenticated: Boolean,
		updateStatus: Function
	},
	methods: {
		authenticate: function() {
			auth.login();
			this.updateStatus();
		},
		logout: function() {
			auth.logout();
			this.updateStatus();
		}
	},
	data() {
		return {
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
					link: "/concept"
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
					link: "/livraison"
				}
			]
		};
	}
};
</script>

<style lang="stylus" scoped>
.link
	letter-spacing 0.1em
	font-weight 400
	font-size 0.9em

.clickable
	cursor pointer
</style>
