<template lang="pug">
v-img(style="position: relative" src="./home_carousel.jpg" min-height="360" max-height="420")
	div.image-filter.lightaccent.hidden-md-and-up
	v-layout(row align-center fill-height wrap)
		div.hidden-sm-and-down(style="flex-grow: 5")
		v-layout(style="z-index: 120" column align-center)
			h3.bm-pretitle.darkaccent--text.hidden-sm-and-down Délicieux et savoureux
			div.separator.lightaccent.my-3.hidden-sm-and-down
			h1.reduced-line
				span.bm-h1.ly Paniers composés 
				br
				span.bm-h1.ly.title-sep de 
				span.bm-h1.ly.primary--text fruits & légumes 
			div.separator.lightaccent.my-3.hidden-sm-and-down
			h3.darkaccent--text.hidden-sm-and-down
				span.bm-pretitle Mais aussi épicerie, produits frais, ...
				br
				span.bm-subtitle livrés directement à votre porte !
			v-btn.secondary.mt-3.cta.font-weight-bold.elevation-1(large) Les Paniers de la Semaine
		v-spacer.hidden-sm-and-down
</template>

<script>
export default {
	name: "HomeCarousel"
};
</script>

<style lang="stylus" scoped>
.cta
	border-radius 0.2em
	text-transform none
	font-size 1.2em
	font-weight 500

.reduced-line
	line-height 1.4em

.title-sep
	font-size 1em

.separator
	width 250px
	height 2px
</style>
