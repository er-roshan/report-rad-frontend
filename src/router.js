import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './store/auth'

const authGuard = (to, from, next) => {
    const authStore = useAuthStore()
    if(to.meta.requiresAuth && authStore.token === null) {
        next({name: 'login'})
    } else {
        next()
    }
}

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Dashboard',
        component: ()=> import('./layouts/default.vue'),
        meta: {requiresAuth: true},
        beforeEnter: authGuard,
        children: [
            {
                path: '/dashboard',
                component: ()=> import('./pages/home.vue')
            },
            {
                path: '/staffs',
                component: ()=> import('./pages/staffs/index.vue')
            },
            {
                path: '/staffs/create',
                component: ()=> import('./pages/staffs/create.vue')
            },
            {
                path: '/patients',
                component: ()=> import('./pages/patients/index.vue')
            },
            {
                path: '/patients/create',
                component: ()=> import('./pages/patients/create.vue')
            },
            {
                path: '/templates',
                component: ()=> import('./pages/templates/index.vue')
            },
            {
                path: '/templates/create',
                component: ()=> import('./pages/templates/create.vue')
            },
            {
                path: '/reports',
                component: ()=> import('./pages/reports/index.vue')
            },
            {
                path: '/reports/create',
                component: ()=> import('./pages/reports/create.vue')
            },
        ]
    },
    {
        name: 'login',
        path: '/login',
        component: ()=> import('./pages/login.vue')
    },
    {
        name: 'register',
        path: '/register',
        component: ()=> import('./pages/register.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;