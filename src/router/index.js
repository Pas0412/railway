import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    children: [
      { path: 'dashboard', component: () => import('@/views/DashBoard.vue') },
      { path: 'settings', component: () => import('@/views/Settings.vue') },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
