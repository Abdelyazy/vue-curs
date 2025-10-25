import { createRouter, createWebHistory } from 'vue-router'

const DashboardView = () => import('./pages/DashboardView.vue')
const TasksView = () => import('./pages/TasksView.vue')
const SettingsView = () => import('./pages/SettingsView.vue')
const TaskDetailsView = () => import('./pages/TaskDetailsView.vue')
const NotFoundView = () => import('./pages/NotFoundView.vue')
const ProfileView = () => import('./components/ProfileView.vue')
const SecurityView = () => import('./components/SecurityView.vue')

const routes = [
  { path: "/", redirect: "/dashboard" },
  { path: "/dashboard", component: DashboardView },
  { path: "/tasks", component: TasksView },
  {
    path: "/tasks/:id",
    component: TaskDetailsView,
    props: true
  },
  {
    path: "/settings",
    component: SettingsView,
    children: [
      { path: "", redirect: "/settings/profile" },
      { path: "profile", component: ProfileView },
      { path: "security", component: SecurityView }
    ]
  },
  { path: "/404", component: NotFoundView },
  { path: "/:pathMatch(.*)*", redirect: "/404" }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'router-link--intermediate',
  linkExactActiveClass: 'router-link--active'
})
