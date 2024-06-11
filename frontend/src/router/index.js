
import { createWebHashHistory, createRouter } from "vue-router";
import SignUp from '@/components/users/SignUp.vue';
import SignIn from '@/components/users/SignIn.vue';
import MyPage from '@/components/users/MyPage.vue';
import Register from "@/components/users/Register.vue";
import AccountRecord from "@/components/account/AccountRecord.vue";
import AccountRegistration from "@/components/account/AccountRegistration.vue";
import AccountStatistics from "@/components/account/AccountStatistics.vue";

const router = createRouter({
    history : createWebHashHistory(),
    routes:[
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
        {
            path : '/register',
            name : 'register',
            component : Register
        },
        {
            path : '/accountRecord',
            name : 'accountRecord',
            component : AccountRecord
        },
        {
            path : '/accountRegistration',
            name : 'accountRegistration',
            component : AccountRegistration
        },
        {
            //acountStatistics화면 개발용으로 홈화면으로 놔둠
            path : '/',
            name : 'accountStatistics',
            component : AccountStatistics
        }
    ]
});

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;
