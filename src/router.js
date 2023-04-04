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
                path: '/patients/:id',
                component: ()=> import('./pages/patients/detail.vue')
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
                path: '/templates/edit/:id',
                component: ()=> import('./pages/templates/edit.vue')
            },
            {
                path: '/reports',
                component: ()=> import('./pages/reports/index.vue')
            },
            {
                path: '/reports/create/:id',
                component: ()=> import('./pages/reports/create.vue')
            },
            {
                path: '/partners',
                component: ()=> import('./pages/partners.vue')
            },
            {
                path: '/partners/edit/:id',
                component: ()=> import('./pages/partners.vue')
            },
            {
                path: '/departments',
                component: ()=> import('./pages/departments/index.vue')
            },
            {
                path: '/departments/edit/:id',
                component: ()=> import('./pages/departments/index.vue')
            },
            {
                path: '/hospitals',
                component: ()=> import('./pages/hospitals/index.vue')
            },
            {
                path: '/hospitals/edit/:id',
                component: ()=> import('./pages/hospitals/index.vue')
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