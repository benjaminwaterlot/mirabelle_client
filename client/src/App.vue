<template lang="pug">
v-app
	Navbar
	v-content.light
		Home
</template>

<script>
import Home from "./views/Home";
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
