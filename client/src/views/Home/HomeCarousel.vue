<template lang="pug">
v-img(src="./home_carousel.jpg" min-height="360")
	v-layout(row align-center fill-height wrap)
		div.hidden-sm-and-down(style="flex-grow: 5")
		v-layout(column align-center)
			h3.text-uppercase.subtitle.lighter.darkaccent--text.hidden-sm-and-down Délicieux et savoureux
			div.separator.lightaccent.my-3.hidden-sm-and-down
			h1.darkaccent--text.main-title Paniers composés 
				br
				span.title-sep de 
				span.primary--text fruits & légumes 
			div.separator.lightaccent.my-3.hidden-sm-and-down
			h3.subtitle.text-uppercase.darkaccent--text.hidden-sm-and-down
				span.lighter Mais aussi épicerie, produits frais, ...
				br
				span.regular.text-lowercase livrés directement à votre porte !
			v-btn.secondary.mt-3.cta.font-weight-bold.elevation-1(large) Les Paniers de la Semaine
		v-spacer.hidden-sm-and-down
</template>

<script>
export default {
  name: "HomeCarousel"
};
</script>

<style lang="stylus" scoped>
.green-filter {
  opacity: 0.5;
  position: absolute;
  width: 100%;
  height: 100%;
}

.subtitle {
  text-align: center;
  font-weight: 400;
  font-size: 1em;
}

.lighter {
  letter-spacing: 0.15em;
}

.regular {
  font-size: 1.4em;
  font-weight: 600;
}

.main-title {
  font-size: 4em;
  line-height: 1em;
  font-weight: 500;
  font-family: 'Love Ya Like A Sister';
  text-align: center;
}

.cta {
  border-radius: 0.2em;
  text-transform: none;
  font-size: 1.2em;
  font-weight: 500;
}

.title-sep {
  font-size: 0.6em;
}

.separator {
  width: 250px;
  height: 2px;
}
</style>
