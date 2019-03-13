<template lang="pug">
v-content.pb-5.darkaccent
	v-layout.pa-0(column align-center)
		h1.bm-h1.ly.white--text Newsletter
		v-img.my-4(src='./green_separator.png' width='200')
		p.white--text Vous pouvez vous désinscrire à tout moment. Vous trouverez pour cela nos informations de contact dans les conditions d'utilisation du site.
		v-container
			v-form(v-model="valid" ref="form" dark @submit.prevent="send")
				v-layout(justify-center align-center)
					v-flex(xs12 sm6 md4 lg3)
						v-text-field(label="Mon adresse mail" color="white" dark box required 
									:rules="emailRules" @blur="resetIfEmpty" validate-on-blur
									v-model="emailInput")
					v-flex(xs6 sm4 md3 lg2)
						v-btn.mx-4.mb-4.primary(dark large @click="send") Je m'inscris
	v-snackbar(color="error" v-model="failure" bottom multi-line :timeout="5000")
		span Erreur : un problème de connexion Internet empêche l'inscription. Réessayez plus tard !
		v-btn.failure--text(@click="failure = false" flat) Fermer
	v-snackbar(color="primary" v-model="success" bottom multi-line :timeout="10000")
		span {{ successMessage }}
		v-btn.failure--text(@click="success = false" flat) Fermer
</template>

<script>
import gql from "graphql-tag";
export default {
	name: "Newsletter",
	data() {
		return {
			valid: true,
			emailRules: [
				v => !!v || "N'oubliez pas de saisir votre email !",
				v =>
					/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
					"Cet email semble invalide !"
			],
			emailInput: "",
			failure: false,
			success: false,
			successMessage: ""
		};
	},
	methods: {
		resetIfEmpty(event) {
			const input = ((event || {}).target || {}).value;
			if (!input) this.$refs.form.reset();
		},
		send() {
			if (this.$refs.form.validate()) {
				this.addToNewsList();
			} else {
				console.error("Invalid form input.");
			}
		},
		addToNewsList() {
			// this.success = true;
			// this.successMessage = "Vous êtes inscrit !";
			// this.$refs.form.reset();
			const emailInput = this.emailInput;

			this.$apollo
				.mutate({
					mutation: gql`
						mutation($email: String!) {
							addToNewsletter(email: $email)
						}
					`,
					variables: {
						email: emailInput
					}
				})
				.then(data => {
					this.success = true;
					this.successMessage =
						(data.data || {}).addToNewsletter || "Vous êtes inscrit !";
					this.$refs.form.reset();
				})
				.catch(err => {
					this.failure = true;
					console.error("ERROR IN NEWSLETTER SUBSCRIPTION : \n", err);
				});
		}
	}
};
</script>

<style lang="stylus" scoped>
</style>
