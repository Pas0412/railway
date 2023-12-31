import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: () => import('@/views/Home.vue'),
        redirect: '/dashboard',
        children: [
            { path: 'dashboard', component: () => import('@/views/DashBoard.vue') },
            { path: 'devices', component: () => import('@/views/Devices.vue') },
            { path: 'sensors', component: () => import('@/views/Sensors.vue') },
            {
                path: 'data', component: () => import('@/views/MonitoringData.vue')
            },
            { path: 'monitoring-data', component: () => import('@/views/MonitoringData.vue')},
            { path: 'real-time-chart', component: () => import('@/views/RealTimeChart.vue')},
            { path: 'warnings', component: () => import('@/views/Warnings.vue') },
            { path: 'auth', component: () => import('@/views/Auth.vue') },
            { path: 'settings', component: () => import('@/views/Settings.vue') },
        ],
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/signup',
        component: () => import('@/views/SignUp.vue')
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    // const isLogin = store.getters['user/isAuthenticated'];
    const isLogin = localStorage.getItem('user');
    if (to.meta.requiresAuth && !isLogin) {
        // 如果需要登录而且用户未认证，重定向到登录页面
        next('/login');
    } else {
        next();
    }
});

export default router;
