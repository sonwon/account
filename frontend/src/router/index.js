
import { createWebHashHistory, createRouter } from "vue-router";
import SignUp from '@/components/users/SignUp.vue';
import SignIn from '@/components/users/SignIn.vue';
import MyPage from '@/components/users/MyPage.vue';
import AccountRegistration from "@/components/account/AccountRegistration.vue";
import AccountStatistics from "@/components/account/AccountStatistics.vue";
import AccountUpdate from "@/components/account/AccountUpdate.vue";
import Calendar from "@/components/calendar/Calendar.vue";
import CalendarInfo from "@/components/calendar/CalendarInfo.vue";
import CalendarDayInfo from "@/components/calendar/CalendarDayInfo.vue";

//account 컴포넌트로 이동할 때 userId값이 없으면 접근을 불허한다
const accountIdGuard = (to, from) =>{
  let userId = localStorage.getItem('userId');
  if(userId == undefined){
      return false;
  }
  else{
      return true;
  }
}

//컴포넌트 라우팅 값들
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
            beforeEnter:accountIdGuard
          },
          {
            path: '/sign-up',
            name: 'SignUp',
            component: SignUp,
          },
        {
            path : '/accountRegistration',
            name : 'accountRegistration',
            component : AccountRegistration,
            beforeEnter:accountIdGuard
        },
        {
            path : '/accountStatistics',
            name : 'accountStatistics',
            component : AccountStatistics,
            beforeEnter:accountIdGuard
        },
        {
          path : '/accountUpdate/:accountId',
          name : 'accountUpdate/accountId',
          component : AccountUpdate,
          beforeEnter:accountIdGuard
        },
        {
            path: '/Calendar',
            name: 'Calendar',
            component: Calendar,
            beforeEnter:accountIdGuard,
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
