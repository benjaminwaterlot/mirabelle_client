<template>
<v-card depressed>
	<v-img :src="image_src" aspect-ratio="1.3"></v-img>
	<v-card-title primary-title>
		<div>
			<h3 class="title mb-2">{{ name }}</h3>
			<div>{{ description }}</div>
		</div>
	</v-card-title>

	<v-card-actions>
		<v-flex>
			<v-btn flat color="primary">
				<v-icon small left>shopping_basket</v-icon>
				<span>Ajouter au panier</span>
			</v-btn>
			<v-btn flat>En savoir plus</v-btn>
		</v-flex>
	</v-card-actions>
</v-card>
</template>

<script>
export default {
	name: "ProductCard",
	props: {
		name: String,
		description: String,
		price: Number,
		origin: String,
		image_src: String,
	},
}
</script>

<style lang="stylus" scoped>

</style>
