<template lang="pug">
div
	v-img(:src="imageSrc" min-height="360" max-height="420")
		div.image-filter.darker.black
		v-layout(column justify-center fill-height)
			h1.bm-title(style="z-index: 120").white--text
				span.bm-subtitle {{ titleFirstPart }}
				br
				span.love-ya.bm-title {{ titleMainPart }}
				br
				span.bm-title.smaller.love-ya {{ titleLastPart }}
	v-img.paper-separator(src="./sand_separator_1.png" height="60px")
	
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
.main-title {
	font-size: 1.3em;
}

.paper-separator {
	top: -40px;

	&.reverse {
		transform: scaleY(-1);
		top: 30px;
	}
}
</style>
