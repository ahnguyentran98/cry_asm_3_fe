import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'LoginPage',
            component: Login
        },
        {
            path: '/register',
            name: 'RegisterPage',
            component: Register
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
})
export default router
