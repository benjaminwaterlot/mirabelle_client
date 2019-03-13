<template lang="pug">
v-content.pa-0.white
	IllustratedTitle(titleFirstPart="Comment fonctionne"
					titleMainPart="la livraison"
					titleLastPart="de ma commande ?"
					imageSrc="page_livraison/livraison_carousel.jpeg")
	v-container.pa-0
		v-layout(column align-center)
			h2.bm-h2.mb-5(align-center style="max-width: 600px")
				span.primary--text.ly Chaque semaine, 
				//- span Chaque semaine, 
				span nous vous livrons :
			v-container(grid-list-xl)
				v-layout(row wrap)
					v-flex(v-for="delivery in deliveries" :key="delivery.title" xs12 sm6 md4)
						v-card.elevation-1.card-livraison
							v-card-title.primary
								v-icon.white--text(left large) {{ delivery.icon }}
								span.bm-card-title.ly.white--text {{ delivery.title }}
							v-divider
							v-card-text.white {{ delivery.description }}
							v-card-actions
								v-list-tile
									v-layout(align-center justify-end)
										v-btn.primary--text(flat depressed)
											v-icon(left) account_balance_wallet
											span.font-weight-bold {{ delivery.price }}
	v-img.paper-separator.reverse(src="./white_separator_1.png" height="60px")
</template>

<script>
import IllustratedTitle from "@/components/organisms/IllustratedTitle";
import HowItWorks from "@/components/organisms/HowItWorks";
export default {
	name: "PageConcept",
	data() {
		return {
			deliveries: [
				{
					title: "À domicile",
					description:
						"Nous vous livrons directement chez vous (dans l'Ouest Parisien) !\n",
					icon: "home",
					price: "5 - 10€"
				},
				{
					title: "Sur votre lieu de travail",
					description: "Lorem ipsum !\n",
					icon: "work",
					price: "Gratuit"
				},
				{
					title: "Dans un point de retrait",
					description: "Lorem ipsum.",
					icon: "store",
					price: "Gratuit"
				}
			]
		};
	},
	components: { IllustratedTitle, HowItWorks }
};
</script>

<style lang="stylus" scoped>
.card-livraison
	border-radius 8px
</style>
