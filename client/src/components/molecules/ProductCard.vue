<template lang="pug">
v-hover
	v-card.depressed.card(to="/" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`")
		v-img(:src='image_src' aspect-ratio="1.3")
		v-card-text(style="position: relative")
			v-btn.elevation-2(absolute color="primary lighten-1" fab medium right top)
				v-icon shopping_basket
			v-card-title
				h3.mb-2.primary--text.card-title {{ name }}
				p.mb-0 {{ description }}
			v-card-actions
				v-layout.justify-space-around(row wrap)
					v-btn.darkaccent--text.text--lighten-1(flat)
						v-icon.mr-2(left) place
						span {{ origin }}
					v-btn.primary--text(flat)
						v-icon.mr-2(left) search
						span En savoir plus
</template>

<script>
export default {
	name: "ProductCard",
	props: {
		name: String,
		description: String,
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
