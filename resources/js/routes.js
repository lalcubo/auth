import Vue from 'vue'
import Router from 'vue-router';
import principal from './components/Principal';
import registrar from './components/Registrar';
import users from './components/admin/Index';
import usersedit from './components/admin/Edit';

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
    {
        name: 'users',
        path: '/users',
        component: users
    },
    {
        name: 'usersedit',
        path: '/users/:id',
        component: usersedit,
        props: true
    },
]

export default new Router({
    mode: 'abstract',
    base: 'auth/public',
    routes
});