<template lang="pug">
v-container(fluid pa-0 transition="slide-x-transition")
	HomeCarousel
	ProductsPresentation
	//- div(style="background-color: white")
	//- 	v-img.paper-separator(src="./white_separator_1.png" height="60px")
	//- 	v-container
	//- 		h1.bm-h1.mb-5.left
	//- 			span Nos supers 
	//- 			span.primary--text.ly paniers bio
	//- 		//- v-container(grid-list-xl pa-0 mt-2)
	//- 		//- 	v-layout(row wrap)
	//- 		//- 		v-flex(v-for="panier in getPacks" :key="panier.id" xs12 sm6 md4 lg4 xl3)
	//- 		//- 			ProductCard(v-bind="panier")
	//- 	v-img.paper-separator.reverse(src="./white_separator_1.png" height="60px")
	HowItWorks
	Newsletter
</template>

<script>
import gql from "graphql-tag";
import ProductCard from "@/components/molecules/ProductCard";
import HowItWorks from "@/components/organisms/HowItWorks";
import HomeCarousel from "./HomeCarousel";
import Newsletter from "@/components/organisms/banners/Newsletter";
import ProductsPresentation from "@/components/organisms/ecommerce/ProductsPresentation";

export default {
	name: "Home",
	data() {
		return {};
	},
	components: {
		ProductCard,
		HowItWorks,
		HomeCarousel,
		Newsletter,
		ProductsPresentation
	}
};
</script>

<style lang="stylus" scoped>
.paper-separator
	top -30px

	&.reverse
		transform scaleY(-1)
		top 30px
</style>
