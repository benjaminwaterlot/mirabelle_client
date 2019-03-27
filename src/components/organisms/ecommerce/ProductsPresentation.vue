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
				v-flex(v-for="product in refinedProducts.FRUIT" :key="product.name" xs6 sm4 md4 lg3 xl2)
					ProductCard(v-bind="product")
		h2.bm-h2.to-left
			span Nos supers 
			span.ly.primary--text fruits bio 
			span de saison
		v-container.px-0(grid-list-xl)
			v-layout(row wrap)
				v-flex(v-for="product in refinedProducts.VEGETABLE" :key="product.name" xs6 sm4 md4 lg3 xl2)
					ProductCard(v-bind="product")
		h2.bm-h2.to-left
			span Notre super 
			span.ly.primary--text épicerie 
		v-container.px-0(grid-list-xl)
			v-layout(row wrap)
				v-flex(v-for="product in refinedProducts.OTHER" :key="product.name" xs6 sm4 md4 lg3 xl2)
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
	components: {
		ProductCard
	},
	computed: {
		refinedProducts: function() {
			if (!this.getCurrentProducts) return [];
			console.log(byCategory);

			const imageRefined = this.getCurrentProducts.map(product => {
				const { picture, ...rest } = product;
				return { picture: `images/${product.picture}`, ...rest };
			});
			const byCategory = _.groupBy(imageRefined, "category");
			return byCategory;
		}
	},
	apollo: {
		getCurrentProducts: gql`
			{
				getCurrentProducts {
					ref
					name
					picture
					origin
					category
					price_ht
					bio
					getWikiProduct {
						description_short
					}
				}
			}
		`
	}
};
</script>

