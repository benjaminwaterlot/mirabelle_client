<template lang="pug">
v-container(fluid pa-0)
	h1.display-3 Logging in !
</template>

<script>
import auth from "@/auth/AuthService";

export default {
	name: "Authentication",
	created() {
		console.log("IN AUTHENTICATION, LOCALSTORAGE IS ", localStorage);
		console.log("IN AUTHENTICATION, AUTH IS ", auth);
		auth.handleAuthentication();
	}
};
</script>

<style lang="stylus" scoped>
</style>
