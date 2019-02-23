<template lang='pug'>
v-toolbar.white.elevation-2(app prominent)
	v-img(src="./logo.png" max-height="70%" contain)
	v-spacer(grow)
	v-toolbar-items
		v-btn.darkaccent--text.link(flat v-for="item in items" @click="item.dropdownOpen = !item.dropdownOpen") {{ item.label }}
			//- v-navigation-drawer(clipped temporary v-model="item.dropdownOpen")
			//- 	v-list
			//- 		v-list-tile(v-for="dropItem in item.dropdown" :key="dropItem.label")
			//- 			v-btn(flat) {{ dropItem.label }}
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
					dropdown: null,
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
