<template>
  <v-app>
    <v-toolbar app class="white elevation-2" prominent>
      <!-- <v-img src="./logo.png" max-height="70%" contain/> -->
      <v-toolbar-title class="headline text-uppercase">
        <span>Basilic</span>
        <span class="font-weight-light"> et Mirabelle</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-btn flat color="primary">
		<v-icon left>account_circle</v-icon>
        <span>Mon espace client</span>
      </v-btn>
    </v-toolbar>

    <v-content class="light">
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from "./views/Home";

export default {
  name: "App",
  components: {
    Home
  },
  data() {
    return {
      //
    };
  }
};
</script>
