<template lang="pug">
v-card.depressed
	v-img(:src='image_src' aspect-ratio="1.3")
	v-card-title(primary-title)
		h3.title.mb-2 {{ name }}
		p.mb-0 {{ description }}
	v-card-actions
		v-flex
			v-btn(flat color="primary") Ajouter au panier
			v-btn(flat) En savoir plus
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
</style>
