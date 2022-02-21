require('./bootstrap');
import router from './routes';
window.Vue = require('vue').default;

Vue.component('front', require('./components/Front.vue').default);

const app = new Vue({
    el: '#app',
    router
});