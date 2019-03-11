<template lang="pug">
v-container.py-5
	h1.love-ya.text-xs-center.text--darken-3.grey--text.font-weight-regular Comment ça marche ?
	v-layout(column align-center)
		v-img.my-4(src='./green_separator.png' width='200')
	v-container(grid-list-xl)
		v-layout(row wrap)
			v-flex.text-sm-center(v-for="step in steps" :key="step.id" xs12 sm6 md3)
				v-layout.mb-4.px-5(row justify-space-between)
					div
						p.step-head.my-0.primary--text Etape
						p.step-num.primary--text.font-weight-medium {{ step.id + 1 }}
					v-img(:src="step.image_src" max-width='80%')
				p.body-2.font-weight-bold {{step.heading}}
				p.body-1 {{step.description}}
				v-btn(:to="step.link_route" flat color="primary") {{step.link_label}}
</template>

<script>
export default {
	name: "HowItWorks",
	data() {
		return {
			steps: [
				{
					id: 0,
					heading:
						"Sélectionnez un panier composé ou faites votre propre panier",
					description:
						"Choisissez parmi nos différents paniers de la semaine, personnalisez-le ou composez vous même votre commande de A à Z selon vos envies!",
					link_label: "Ajoutez-y nos supers produits",
					link_route: "/",
					image_src: "./HowItWorks/illu_etape_1.png"
				},
				{
					id: 1,
					heading: "Personnalisez-le avec vos produits préférés",
					description:
						"Envie d'un peu plus de pommes ou de bananes ? De remplacer des carottes par des pommes de terre ? Faites-vous plaisir.",
					link_label: "Découvrez nos paniers",
					link_route: "/",
					image_src: "./HowItWorks/illu_etape_2.png"
				},
				{
					id: 2,
					heading: "Dites-nous où vous livrer",
					description:
						"Gagnez du temps : faites vous livrer gratuitement au point retrait le plus proche ou choisissez une livraison à la maison ou bien directement au bureau (en Île de France).",
					link_label: "Notre service de livraison",
					link_route: "/",
					image_src: "./HowItWorks/illu_etape_3.png"
				},
				{
					id: 3,
					heading: "Votre panier est arrivé !",
					description:
						"En hop c'est livré ! Vous êtes prêt à déguster nos délicieux produits. Besoin d'inspiration pour cuisiner ? Retrouvez toutes nos idées de recettes sur notre site.",
					link_label: "Supers recettes",
					link_route: "/",
					image_src: "./HowItWorks/illu_etape_4.png"
				}
			]
		};
	}
};
</script>

<style lang="stylus" scoped>
.love-ya {
	font-family: 'Love Ya Like A Sister';
	font-size: 3em;
}

.step-head {
	font-family: 'Love Ya Like A Sister';
	font-size: 1.2em;
}

.step-num {
	font-family: 'Love Ya Like A Sister';
	font-size: 3em;
	margin-top: -10px;
}
</style>
