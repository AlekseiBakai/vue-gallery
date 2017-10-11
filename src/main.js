import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: {App}
});
