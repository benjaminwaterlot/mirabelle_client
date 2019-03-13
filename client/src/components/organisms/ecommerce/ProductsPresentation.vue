<template lang="pug">
v-content.white.py-0
	v-img.paper-separator(src="./white_separator_1.png" height="60px")
	v-container.py-0
		h2.bm-h2.to-left
			span Nos supers 
			span.ly.primary--text légumes bio 
			span de saison
		v-container.px-0(grid-list-xl)
			v-layout(row wrap)
				v-flex(v-for="product in refinedProducts" :key="product.name" xs6 sm4 md4 lg3 xl2)
					ProductCard(v-bind="product")
	v-img.paper-separator.reverse(src="./white_separator_1.png" height="60px")
</template>


<script>
import gql from "graphql-tag";
import ProductCard from "@/components/molecules/ProductCard";
import tempProducts from "./temp_products.json";
import _ from "lodash";

export default {
	name: "ProductsPresentation",
	data() {
		return {
			getCurrentProducts: tempProducts
		};
	},
	components: {
		ProductCard
	},
	computed: {
		refinedProducts: function() {
			if (!this.getCurrentProducts) return [];
			const byCategory = _.groupBy(this.getCurrentProducts, "category");
			console.log(byCategory);

			return this.getCurrentProducts.map(product => {
				const { picture, ...rest } = product;
				return { picture: `images/${product.picture}`, ...rest };
			});
		}
	}
	// apollo: {
	// 	getCurrentProducts: gql`
	// 		{
	// 			getCurrentProducts {
	// 				name
	// 				picture
	// 				origin
	// 				category
	// 				price_ht
	// 				bio
	// 			}
	// 		}
	// 	`
	// }
};
</script>

