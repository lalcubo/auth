import Vue from 'vue'
import Router from 'vue-router';
import principal from './components/Principal';
import registrar from './components/Registrar';

Vue.use(Router);

const routes = [
    {
        name: 'principal',
        path: '/principal',
        component: principal
    },
    {
        name: 'registrar',
        path: '/registrar',
        component: registrar
    },
]

export default new Router({
    mode: 'abstract',
    base: 'auth/public',
    routes
});