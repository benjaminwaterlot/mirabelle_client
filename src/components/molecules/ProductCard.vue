<template lang="pug">
v-hover
	v-card.depressed.card(to="/" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`")
		v-img(position='center center' :src='picture' aspect-ratio="1.3")
		v-card-text(style="position: relative")
			v-btn.elevation-1(absolute color="primary lighten-1" @click="addToBasket()" fab small right top)
				v-icon(medium) add
			v-card-title.pt-0
				h3.bm-h3.ly.primary--text.to-left {{ name }}
				p.mb-0.to-left {{ reducedText }}
			v-card-actions.mt-2
				v-layout(row wrap justify-space-around align-center)
					v-chip.light()
						v-icon.mr-2(left small) place
						span {{ origin }}
					v-chip.primary.lighten-1(dark)
						span.caption.font-weight-bold {{ price_ht.toFixed(2).replace('.', ',') }} €
</template>

<script>
import gql from "graphql-tag";
import textReducer from "@/helpers/textReducer.js";
export default {
	name: "ProductCard",
	props: {
		name: String,
		id: String,
		getWikiProduct: Object,
		price_ht: Number,
		origin: String,
		picture: String
	},
	mounted() {
		console.log(this.id);
	},
	methods: {
		addToBasket() {
			this.$apollo.mutate({
				mutation: gql`
					mutation($id: String!) {
						addCartItem(productRef: $id) {
							getProduct {
								price_ht
							}
						}
					}
				`,
				variables: {
					id: this.id
				}
			});
			// .then(data => {
			// 	this.success = true;
			// 	this.successMessage =
			// 		(data.data || {}).addToNewsletter || "Vous êtes inscrit !";
			// 	this.$refs.form.reset();
			// })
			// .catch(err => {
			// 	this.failure = true;
			// 	console.error("ERROR IN NEWSLETTER SUBSCRIPTION : \n", err);
			// });
			return true;
		}
	},
	computed: {
		reducedText: function() {
			return textReducer((this.getWikiProduct || {}).description_short, 48);
		}
	}
};
</script>

<style lang="stylus" scoped>
.card-title
	font-weight 400
	font-size 1.8em
	font-family 'Love Ya Like A Sister'

.card
	border-radius 0.5em

.card-description
	text-overflow ellipsis
	overflow hidden
</style>
