import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify';

import Login from './components/Login';
import Main from './components/HelloWorld';
import Cosis from './components/Cosis';

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({

  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/main',
      component: Main,
    },
    {
      path: '/Cosis',
      component: Cosis,
    }
  ],
});

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')

router.replace('/login');
