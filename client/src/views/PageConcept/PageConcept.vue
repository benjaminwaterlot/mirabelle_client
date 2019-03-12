<template lang="pug">
v-content.pa-0.light
	IllustratedTitle(titleFirstPart="Basilic & Mirabelle"
					titleMainPart="des Supers Paniers de"
					titleLastPart="fruits & légumes bio"
					imageSrc="page_concept.jpg")
	v-layout(column align-center)
		h2.bm-h2.mb-4(align-center style="max-width: 600px")
			span Des produits sélectionnés avec amour de vos papilles... 
			span.primary--text.ly et de la nature !
		v-container
			v-layout(row justify-center wrap)
				v-flex.px-3(v-for="item in items" :key="item.title" xs12 sm6 md4)
					v-layout(row align-center)
						v-flex
							v-img(:src="item.image" style="border-radius: 5px;" height="200")
							h3.bm-title-card.my-2 {{item.title}}
							p.bm-text-card {{item.text}}
	HowItWorks

    
</template>

<script>
import IllustratedTitle from "@/components/organisms/IllustratedTitle";
import HowItWorks from "@/components/organisms/HowItWorks";
export default {
	name: "PageConcept",
	data() {
		return {
			items: [
				{
					title: "Tous nos produits sont sélectionnés avec soin",
					text:
						"Par nos producteurs, mais également lors de la préparation de votre commande ...",
					image: "./page_concept/concept_image_1.jpg"
				},
				{
					title: "En plus du bio, nous privilégions les produits locaux",
					text: "Lorem ipsum dolor sit amet, consectetur cras amet.",
					image: "./page_concept/concept_image_2.jpg"
				},
				{
					title: "Chaque semaine nous partageons avec vous nos recettes",
					text: "pour cuisiner de manière saine ET gourmande, toute l'année.",
					image: "./page_concept/concept_image_3.jpg"
				}
			]
		};
	},
	components: { IllustratedTitle, HowItWorks }
};
</script>
