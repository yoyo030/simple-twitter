import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from '../views/NotFound.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import AdminLogIn from '../views/AdminLogIn.vue'
import store from './../store'
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
    path: '/admin/userlist',
    name: 'admin-user-list',
    component: () => import('../views/AdminUserList.vue'),
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue'),
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
    path: '/home/replylist/:id',
    name: 'reply-list',
    component: () => import('../views/ReplyList.vue'),
  },
  {
    path: '/userfollower/:id',
    name: 'user-follower',
    component: () => import('../views/UserFollower.vue'),
  },
  {
    path: '/userfollowing/:id',
    name: 'user-following',
    component: () => import('../views/UserFollowing.vue'),
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

//路由改變要驗證使用者身分
router.beforeEach(async (to, from, next) => {
  
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    //先註解因為store.dispatch('fetchCurrentUser')尚未完工
    //isAuthenticated = await store.dispatch('fetchCurrentUser')
    isAuthenticated = false;
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['sign-up', 'log-in']

  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {   
    localStorage.removeItem('vuex')
    next('/login')
    return
  }

  // 如果 token 有效則轉址到餐廳首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/home')
    return
  }

  next()
})
export default router;
