<template lang="pug">
v-app
	Navbar
	v-content.light
		router-view
</template>

<script>
import Home from "./views/Home/Home";
import Navbar from "@/components/organisms/Navbar";

export default {
	name: "App",
	components: {
		Home,
		Navbar
	},
	data() {
		return {
			//
		};
	}
};
</script>

<style lang="stylus">
.love-ya {
	font-family: 'Love Ya Like A Sister';
}
</style>
