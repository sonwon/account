
import { createWebHashHistory, createRouter } from "vue-router";
import SignUp from '@/components/users/SignUp.vue';
import SignIn from '@/components/users/SignIn.vue';
import MyPage from '@/components/users/MyPage.vue';
import AccountRecord from "@/components/account/AccountRecord.vue";
import AccountRegistration from "@/components/account/AccountRegistration.vue";
import AccountStatistics from "@/components/account/AccountStatistics.vue";
import AccountUpdate from "@/components/account/AccountUpdate.vue";
import Calendar from "@/components/calendar/Calendar.vue";
import CalendarInfo from "@/components/calendar/CalendarInfo.vue";
import CalendarDayInfo from "@/components/calendar/CalendarDayInfo.vue";


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
            path : '/accountStatistics',
            name : 'accountStatistics',
            component : AccountStatistics
        },
        {
          path : '/accountUpdate/:accountId',
          name : 'accountUpdate/accountId',
          component : AccountUpdate
        },
        {
            path: '/Calendar',
            name: 'Calendar',
            component: Calendar,
            children: [
                {
                    path: '/:id',
                    name: 'Calendar/id',
                    component: CalendarInfo
                },{
                    path: '/:userId/:createAt',
                    name: 'Calendar/day',
                    component: CalendarDayInfo
                }
            ]
        }
    ]
});

export default router;
