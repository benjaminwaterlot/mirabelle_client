<template lang="pug">
v-app
	Navbar
	v-content.light
		router-view
</template>

<script>
import Home from "./views/Home/Home";
import Navbar from "@/components/organisms/Navbar";
import auth from "@/auth/AuthService";

export default {
	name: "App",
	components: {
		Home,
		Navbar
	},
	data() {
		return {
			isAuthenticated: null
		};
	},
	mounted() {
		this.isAuthenticated = auth.isAuthenticated();
		setTimeout(() => console.log(auth.isAuthenticated()), 2000);
	}
};
</script>

<style lang="stylus">
.love-ya {
	font-family: 'Love Ya Like A Sister';
}
</style>
