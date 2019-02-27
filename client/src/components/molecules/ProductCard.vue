<template lang="pug">
v-hover
	v-card.depressed.card(to="/" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`")
		v-img(position='center center' :src='image_src' aspect-ratio="1.3")
		v-card-text.px-2(style="position: relative")
			v-btn.elevation-2(absolute color="primary lighten-1" fab medium right top)
				v-icon shopping_basket
			v-card-title
				h3.mb-2.primary--text.card-title {{ label }}
				p.mb-0 {{ description_short }}
			v-card-actions
				v-layout.justify-center(row wrap)
					v-btn.caption(flat)
						v-icon.mr-2(left) place
						span {{ origin }}
					v-btn.caption.primary--text(flat)
						v-icon.mr-2(left) search
						span En savoir plus
</template>

<script>
export default {
	name: "ProductCard",
	props: {
		label: String,
		description_short: String,
		price: Number,
		origin: String,
		image_src: String
	}
};
</script>

<style lang="stylus" scoped>
.card-title {
	font-weight: 400;
	font-size: 1.8em;
	font-family: 'Love Ya Like A Sister';
}

.card {
	border-radius: 0.5em;
}
</style>
