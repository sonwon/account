import { createRouter, createWebHistory } from 'vue-router';
import SignUp from '../components/users/SignUp.vue';
import SignIn from '../components/users/SignIn.vue';
import MyPage from '../components/users/MyPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/sign-in'
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/my-page',
    name: 'MyPage',
    component: MyPage,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
