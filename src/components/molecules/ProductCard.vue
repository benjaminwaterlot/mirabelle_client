<template lang="pug">
v-hover
	v-card.depressed.card(to="/" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`")
		v-img(position='center center' :src='picture' aspect-ratio="1.3")
		v-card-text(style="position: relative")
			v-btn.elevation-2(absolute color="primary lighten-2" fab small right top)
				v-icon shopping_cart
			v-card-title
				h3.bm-h3.ly.primary--text.to-left {{ name }}
				//- p.mb-0 {{ description_short }}
			v-card-actions
				v-layout(row wrap justify-space-between align-center)
					v-btn.caption(flat)
						v-icon.mr-2(left small) place
						span {{ origin }}
					
					//- v-btn.caption.primary--text(fab small flat)
					//- 	v-icon(small) search
</template>

<script>
export default {
	name: "ProductCard",
	props: {
		name: String,
		// description_short: String,
		price_ht: Number,
		origin: String,
		picture: String
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
</style>
