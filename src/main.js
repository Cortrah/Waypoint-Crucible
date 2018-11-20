import Vue from 'vue';
import Vuex from 'vuex'

import App from './App.vue';
import router from './router.js';
import store from './store/store.js'

Vue.use(Vuex);
Vue.use(router);

Vue.config.devtools = true;
Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});
