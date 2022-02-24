import Vue from 'vue'
import Router from 'vue-router';
import principal from './components/Principal';

Vue.use(Router);

const routes = [
    {
        name: 'principal',
        path: '/principal',
        component: principal
    }
]

export default new Router({
    mode: 'history',
    base: 'auth/public',
    routes
});