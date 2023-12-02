import { createRouter, createWebHistory } from 'vue-router';

import NotFoundView from '../views/NotFoundView.vue';
import AgentsView from '../views/AgentsView.vue';
import WeaponsView from '../views/WeaponsView.vue';


const routes = [
  {
    path: '/',
    name: 'Agents',
    component: AgentsView
  },
  {
    path: '/weapons',
    name: 'Weapons',
    component: WeaponsView
  },
  {
    path: '/weapons/:id',
    name: 'WeaponDetails',
    component: WeaponsView
  },
  {
    path: '/404',
    name: 'notFound',
    component: NotFoundView
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;