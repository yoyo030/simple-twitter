import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from '../views/NotFound.vue'
import SignUp from '../views/SignUp.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/signup',
    name: 'sign-up',
    component: SignUp,
  },
  
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
