import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import RegisterConfirm from '@/components/RegisterConfirm.vue';
import SubmitOTP from '@/components/SubmitOTP.vue';
import UserInfo from '@/components/UserInfo.vue';
import PostMessage from '@/components/PostMessage.vue';
import ViewMessage from '@/components/ViewMessage.vue';
import UpdateUserLevel from '@/components/UpdateUserLevel.vue';

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
            path: '/register-confirm',
            name: 'RegisterConfirmPage',
            component: RegisterConfirm
        },
        {
            path: '/submit-otp',
            name: 'SubmitOTPPage',
            component: SubmitOTP
        },
        {
            path: '/user-info',
            name: 'UserInfoPage',
            component: UserInfo
        },
        {
            path: '/post-message',
            name: 'PostMessagePage',
            component: PostMessage
        },
        {
            path: '/view-message',
            name: 'ViewMessagePage',
            component: ViewMessage
        },
        {
            path: '/update-user-level',
            name: 'UpdateUserLevel',
            component: UpdateUserLevel
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
})
export default router
