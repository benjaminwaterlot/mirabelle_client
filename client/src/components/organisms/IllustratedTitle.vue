<template lang="pug">
v-img(:src="imageSrc" min-height="360")
    v-layout(column justify-center fill-height)
        h1.display-2.text-sm-center.white--text.shadowed
            span.text-uppercase {{ titleFirstPart }}
            br
            span.love-ya.main-title {{ titleMainPart }}
            br
            span.love-ya {{ titleLastPart }}
    
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

.shadowed {
  text-shadow: 3px 2px 4px hsla(0, 0.9, 0.8, 0.3);
}
</style>
