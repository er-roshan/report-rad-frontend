import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Dashboard',
        component: ()=> import('./layouts/default.vue'),
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
                path: '/reports',
                component: ()=> import('./pages/reports/index.vue')
            },
        ]
    },
    {
        path: '/login',
        component: ()=> import('./pages/login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;