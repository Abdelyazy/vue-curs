import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from './auth/index.js'

const DashboardView = () => import('./pages/DashboardView.vue')
const TasksView = () => import('./pages/TasksView.vue')
const SettingsView = () => import('./pages/SettingsView.vue')
const TaskDetailsView = () => import('./pages/TaskDetailsView.vue')
const NotFoundView = () => import('./pages/NotFoundView.vue')
const LoginView = () => import('./pages/LoginView.vue')
const ProfileView = () => import('./components/ProfileView.vue')
const SecurityView = () => import('./components/SecurityView.vue')

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/login", component: LoginView },
  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: "/tasks",
    component: TasksView,
    meta: { requiresAuth: true }
  },
  {
    path: "/tasks/:id",
    component: TaskDetailsView,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: "/settings",
    component: SettingsView,
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: "/settings/profile" },
      {
        path: "profile",
        component: ProfileView,
        meta: { requiresAuth: true }
      },
      {
        path: "security",
        component: SecurityView,
        meta: { requiresAuth: true }
      }
    ]
  },
  { path: "/404", component: NotFoundView },
  { path: "/:pathMatch(.*)*", redirect: "/404" }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'router-link--intermediate',
  linkExactActiveClass: 'router-link--active'
})

// Навигационный хук для проверки авторизации
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const loggedIn = isLoggedIn()

  if (requiresAuth && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
