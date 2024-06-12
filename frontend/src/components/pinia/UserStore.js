import { defineStore } from "pinia"


export const useUserStore = defineStore("user", {
    state: () => ({ 
        storeUserId : localStorage.getItem('userId') == undefined ? '' : localStorage.getItem('userId'),
        storeUserName : localStorage.getItem('userName') == undefined ? '로그인을 해주세요' : localStorage.getItem('userName'),
        storeIsLogin : localStorage.getItem('userId') == undefined ? '로그인' : '로그아웃'
    }),
    actions: { 
        setStoreUserId: function(userId){
            this.storeUserId = userId;
        },
        setStoreUserName: function(userName){
            this.storeUserName = userName;
        },
        setStoreIsLogin: function(isLogin){
            this.storeIsLogin  = isLogin;
        },
        LoginLogoutMethod: function(){
            if(this.storeIsLogin === '로그인'){
                //로그인 이동 함수
                this.$router.push('/accountStatistics');
            }
            else{
                //로그아웃 함수
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                localStorage.removeItem('userName');
                this.storeUserId='';
                this.storeUserName='로그인을 해주세요';
                this.storeIsLogin='로그인';
                alert("로그아웃 되었습니다");
                this.$router.push('/');
            }
        }
    }
}) 