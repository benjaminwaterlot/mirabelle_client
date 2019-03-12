<template lang="pug">
v-container.pa-0(fluid)
	v-layout(row)
		v-navigation-drawer(permanent clipped height="600")
			//- v-toolbar(flat)
			//- 	v-list
			//- 		v-list-tile
			//- 			v-list-tile-title Mon espace client
			//- v-divider
			v-list(dense)
				v-list-tile(v-for="category in categories" :to="category.link" :key="category.title" exact)
					v-list-tile-action
						v-icon {{ category.icon }}
					v-list-tile-content
						v-list-tile-title {{ category.title }}
		v-content.pt-1
			transition(name="slide-right" mode="out-in")
				router-view
</template>

<script>
export default {
	name: "EspaceClient",
	data() {
		return {
			categories: [
				{
					title: "Accueil",
					link: "/mon-espace",
					icon: "menu"
				},
				{
					title: "Mes informations",
					link: "/mon-espace/mes-informations",
					icon: "account_box"
				},
				{
					title: "Mes commandes",
					link: "/mon-espace/mes-commandes",
					icon: "shopping_basket"
				}
			]
		};
	}
};
</script>

<style>
.ec-title {
	font-weight: 300;
	font-size: 3em;
	font-family: "Love Ya Like A Sister";
}
</style>
