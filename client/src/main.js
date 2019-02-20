import Vue from 'vue'
import VueApollo from 'vue-apollo'
import App from './App.vue'
import router from './router'
import ApolloClient from 'apollo-boost'

const apolloClient = new ApolloClient({
	uri: 'http://localhost:4000/graphql'
})

Vue.config.productionTip = false
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
})

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
