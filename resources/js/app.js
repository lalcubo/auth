require('./bootstrap');
window.Vue = require('vue').default;
import router from './routes';
import Vuetify from '../plugins/vuetify';

Vue.component('front', require('./components/Front.vue').default);

const app = new Vue({
    vuetify: Vuetify,
    el: '#app',
    router
});