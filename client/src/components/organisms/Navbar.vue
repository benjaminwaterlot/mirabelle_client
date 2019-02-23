<template lang='pug'>
v-toolbar.white.elevation-2(app prominent)
	v-img(src="./logo.png" max-height="70%" contain)
	v-toolbar-title.headline.text-uppercase
		span Basilic
		span.font-weight-light  et Mirabelle
	v-spacer
	v-btn(flat color="primary")
		v-icon(left) account_circle
		span Mon espace client
</template>

<script>
export default {
	name: "Navbar"
};
</script>
