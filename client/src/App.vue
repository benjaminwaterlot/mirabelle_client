<template lang="pug">
v-app
	Navbar(:updateStatus="updateStatus" :isAuthenticated="isAuthenticated")
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
	methods: {
		updateStatus: function(boolean) {
			this.isAuthenticated = auth.isAuthenticated();
		}
	},
	mounted() {
		this.updateStatus();
		console.log(auth);

		auth.authNotifier.on("authChange", (event, listener) => {
			console.log("RECEIVED AN EVENT", event, " and ", listener);
			this.updateStatus();
		});
	}
};
</script>

<style lang="stylus">
.love-ya {
	font-family: 'Love Ya Like A Sister';
}
</style>
