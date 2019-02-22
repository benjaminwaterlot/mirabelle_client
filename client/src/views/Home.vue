<template>
	<v-container fluid pa-0>
		<v-img src="./home_carousel.jpg"/>
		<div style="background-color: white">
			<v-img src="./white_separator_1.png" class="paper-separator" height="60px"/>
			<v-container>
				<h1 class="font-weight-medium">
					Nos supers
					<span class="primary--text">paniers bio</span>
				</h1>
				<v-container grid-list-xl pa-0 mt-2>
					<v-layout row wrap>
						<v-flex v-for="panier in paniers" :key="panier.id" xs4 xl2>
							<v-card>
								<v-img :src="panier.image_src" aspect-ratio="1.3"></v-img>
								<v-card-title primary-title>
									<div>
										<h3 class="title mb-2">{{ panier.name }}</h3>
										<div>{{ panier.description }}</div>
									</div>
								</v-card-title>

								<v-card-actions>
									<v-btn flat color="primary">Ajouter au panier</v-btn>
									<v-btn flat>En savoir plus</v-btn>
								</v-card-actions>
							</v-card>
						</v-flex>
					</v-layout>
				</v-container>
			</v-container>
			<v-img src="./white_separator_1.png" class="paper-separator reverse" height="60px"/>
		</div>
	</v-container>
</template>

<script>
export default {
	name: "Home",
	data() {
		return {
			paniers: [
				{
					name: "Super Mix Individuel",
					origin: "France",
					description:
						"Une sélection des meilleurs fruits et légumes de la saison.",
					price: "16,00€",
					id: 1,
					image_src: "panier-supermix.jpg"
				},
				{
					name: "Panier découverte",
					origin: "France",
					description:
						"Une sélection de fruits et légumes pour vos repas de tous les jours.",
					price: "10,00€",
					id: 2,
					image_src: "panier-decouverte.jpg"
				}
			]
		};
	}
};
</script>

<style lang="stylus" scoped>
.primary--text
	font-family 'Love Ya Like A Sister'
	font-size 1.2em

.paper-separator
	top: -30px;
	&.reverse
		transform: scaleY(-1)
		top: 30px
</style>
