<template>
  <div class="about">
    <h1>This is an about page</h1>
	<p>There are {{2 + 3}} clients. </p>
	<p>Clients : {{ hello }} </p>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';

export default {
	name: "About",
	data() {
		return {
			hello: "coucou le monde"
		}
	},
	apollo: {
		hello: gql`{helloWorld}`
	}
}
</script>
