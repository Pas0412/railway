import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    children: [
      { path: 'dashboard', component: () => import('@/views/DashBoard.vue') },
      { path: 'devices', component: () => import('@/views/Devices.vue') },
      { path: 'sensors', component: () => import('@/views/Sensors.vue') },
      { path: 'data', component: () => import('@/views/Data.vue') },
      { path: 'warnings', component: () => import('@/views/Warnings.vue') },
      { path: 'auth', component: () => import('@/views/Auth.vue') },
      { path: 'settings', component: () => import('@/views/Settings.vue') },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
