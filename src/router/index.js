import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from '../views/NotFound.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import AdminLogIn from '../views/AdminLogIn.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'root',
    redirect:'/login'
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: SignUp,
  },
  
  {
    path: '/login',
    name: 'log-in',
    component: LogIn,
  },  
  {
    path: '/admin/login',
    name: 'admin-log-in',
    component: AdminLogIn,
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Setting.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/ReplyList/:id',
    name: 'reply-list',
    component: () => import('../views/ReplyList.vue'),
  },
  {
    path: '/userfollow',
    name: 'user-follow',
    component: () => import('../views/UserFollow.vue'),
  },
  {
    path: '/userprofile',
    name: 'user-profile',
    component: () => import('../views/UserProfile.vue'),
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
];

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes,
});

export default router;
