<template lang="pug">
div
	v-img(:src="imageSrc" min-height="360" max-height="420")
		div.image-filter.darker.black
		v-layout(column justify-center fill-height)
			h1.white--text.reduced-line(style="z-index: 120")
				span.bm-pretitle {{ titleFirstPart }}
				br
				span.bm-h1.ly {{ titleMainPart }}
				br
				span.bm-h1.smaller.ly {{ titleLastPart }}
	v-img.paper-separator(src="./white_separator_1.png" height="60px")
	
</template>

<script>
export default {
	name: "IllustratedTitle",
	props: {
		imageSrc: String,
		titleFirstPart: String,
		titleMainPart: String,
		titleLastPart: String
	}
};
</script>

<style lang="stylus" scoped>
</style>
