import { createWebHashHistory, createRouter } from "vue-router";
import Login from '@/components/users/Login.vue'
import MyPage from "@/components/users/MyPage.vue";
import Register from "@/components/users/Register.vue";
import AccountRecord from "@/components/account/AccountRecord.vue";
import AccountRegistration from "@/components/account/AccountRegistration.vue";
import AccountStatistics from "@/components/account/AccountStatistics.vue";

const router = createRouter({
    history : createWebHashHistory(),
    routes:[
        {
            //login이 기본 페이지
            path : '/login',
            name : 'login',
            component : Login
        },
        {
            path : '/myPage',
            name : 'myPage',
            component : MyPage
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

export default router;

