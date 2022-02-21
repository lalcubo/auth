import Vue from 'vue'
import Router from 'vue-router';
import login from './components/Login';

Vue.use(Router);

const routes = [
    {
        name: 'login',
        path: '/login',
        component: login
    }
]

export default new Router({
    mode: 'history',
    base: 'auth/public',
    routes
});