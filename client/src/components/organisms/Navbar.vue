<template lang='pug'>
v-toolbar.white.elevation-2(app prominent)
	v-img(src="./logo.png" max-height="70%" contain)
	v-spacer(grow)
	v-toolbar-items
		v-menu(flat v-for="item in items" bottom offset-y open-on-hover)
			v-btn.darkaccent--text.link(slot="activator" flat) {{ item.label }}
			v-list(v-if="item.dropdown")
				v-list-tile(@click="" v-for="dropdown in item.dropdown" :key="dropdown.label")
					v-list-tile-title {{ dropdown.label }}
	v-divider.ml-2(vertical)
	v-btn(flat color="primary")
		v-icon(left) account_circle
		span Mon espace client
</template>

<script>
export default {
	name: "Navbar",
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
