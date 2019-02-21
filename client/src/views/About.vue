<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>There are {{2 + 3}} clients.</p>
    <ul>
      <li v-for="client in clients" :key="client.id">{{client.name}}, id: {{client.id}}</li>
    </ul>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "About",
  apollo: {
	clients:
	{
		query: gql`
		{
			clients {
				name
				id
			}
		}
		`,
	}
  }
};
</script>
