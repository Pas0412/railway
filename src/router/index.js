import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
    {
        path: '/',
        component: () => import('@/views/Home.vue'),
        children: [
            { path: 'dashboard', component: () => import('@/views/DashBoard.vue') },
            { path: 'devices', component: () => import('@/views/Devices.vue') },
            { path: 'sensors', component: () => import('@/views/Sensors.vue') },
            {
                path: 'data', component: () => import('@/views/Data.vue')
            },
            { path: 'monitoring-data', component: () => import('@/views/MonitoringData.vue') },
            { path: 'real-time-chart', component: () => import('@/views/RealTimeChart.vue') },
            { path: 'warnings', component: () => import('@/views/Warnings.vue') },
            { path: 'auth', component: () => import('@/views/Auth.vue') },
            { path: 'settings', component: () => import('@/views/Settings.vue') },
        ],
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        component: () => import('@/views/Login.vue')
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const isLogin = store.getters['user/isAuthenticated'];
    if (to.meta.requiresAuth && !isLogin) {
        // 如果需要登录而且用户未认证，重定向到登录页面
        next('/login');
    } else {
        next();
    }
});

export default router;
