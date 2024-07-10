import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import AddProject from '../components/AddProject.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add-project',
    name: 'AddProject',
    component: AddProject,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
