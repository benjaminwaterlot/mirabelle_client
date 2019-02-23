<template lang="pug">
v-container(fluid pa-0)
	v-img(src="./home_carousel.jpg")
	div(style="background-color: white")
		v-img.paper-separator(src="./white_separator_1.png" height="60px")
		v-container
			h1.font-weight-medium
				span Nos supers 
				span.primary--text paniers bio
			v-container(grid-list-xl pa-0 mt-2)
				v-layout(row wrap)
					v-flex(v-for="panier in getProducts" :key="panier.id" xs12 md6 lg4 xl3)
						ProductCard(v-bind="panier")
		v-img.paper-separator.reverse(src="./white_separator_1.png" height="60px")
</template>

<script>
import gql from "graphql-tag";
import ProductCard from "@/components/molecules/ProductCard";

export default {
	name: "Home",
	data() {
		return {};
	},
	components: {
		ProductCard
	},
	apollo: {
		getProducts: {
			query: gql`
				{
					getProducts {
						name
						description
						price
						origin
						image_src
					}
				}
			`
		}
	}
};
</script>

<style lang="stylus" scoped>
.primary--text {
	font-family: 'Love Ya Like A Sister';
	font-size: 1.2em;
}

.paper-separator {
	top: -30px;

	&.reverse {
		transform: scaleY(-1);
		top: 30px;
	}
}
</style>
