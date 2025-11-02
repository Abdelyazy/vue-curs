import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/dashboard',
    component: () => import('../views/DashboardView.vue'),
  },
  {
    path: '/tasks',
    component: () => import('../views/TasksView.vue'),
  },
  {
    path: '/tasks/:id',
    component: () => import('../views/TaskDetailsView.vue'),
    props: true,
  },
  {
    path: '/settings',
    component: () => import('../views/SettingsView.vue'),
    children: [
      {
        path: '',
        redirect: '/settings/profile',
      },
      {
        path: 'profile',
        component: () => import('../views/ProfileView.vue'),
      },
      {
        path: 'security',
        component: () => import('../views/SecurityView.vue'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('../views/NotFoundView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'router-link--intermediate',
  linkExactActiveClass: 'router-link--active',
})

export default router
