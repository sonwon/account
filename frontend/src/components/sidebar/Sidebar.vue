<template>
    <div class="sidebar">
        <div class="header">
            <p style="font-weight: bold; font-size: 27px; color:orange">KB IT's Your Life</p>
            <p style="font-weight: bold; font-size: 27px">가계부 프로젝트</p>
        </div>
        <div class="list">
            <ul class="menu">
                <li v-for="(item, index) in menuItems" :key="index" :class="{ active: selectedItem === item.name }"
                    @click="selectItem(item)" style="line-height: 200%;" >                    
                        {{item.name}}
                </li>
            </ul>            
        </div>
        <div class="footer">
            <p>{{ storeUserName }}</p>
            <router-link to="/" style="color:gray;" @click.prevent="LoginLogoutMethod">{{ storeIsLogin }}</router-link>
        </div>
    </div>

</template>
<script>
import { useUserStore } from '@/components/pinia/UserStore';
import { mapState, mapActions } from 'pinia';

export default {
    name: "Sidebar",
    data() {
        return {
            name: "",
            menuItems: [
                { name: "마이페이지", link: "/my-page" },
                { name: "월별 제정 요약", link: "/accountStatistics" },
                { name: "거래 내역 조회", link: "/Calendar" },
                { name: "입출금 등록", link: "/accountRegistration" }
            ],
            selectedItem: null,
            userId : '',
        }
    },
    computed : {
        ...mapState(useUserStore, ['storeUserId', 'storeUserName', 'storeIsLogin'])
    },
    methods: {
        selectItem(item) {
            if(this.storeUserId !== ''){
                this.selectedItem = item.name;
                this.$router.push(item.link)
            }
            else{
                alert('로그인이 필요한 페이지입니다');
            }
        },
        ...mapActions(useUserStore, ['setStoreUserId', 'setStoreUserName', 'setStoreIsLogin', 'LoginLogoutMethod'])
    }
}
</script>
<style scoped>
.sidebar {
    float: left;
    width: 30%;
    min-width: 400px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.header {
    text-align: center;
    font-weight: bold;
    margin-bottom: 30%;
    padding: 20px;

}
.custom-link:hover {
    color: white;
}
.menu {
    list-style-type: none;
    transition: background-color 0.3s;
    padding: 0;
    text-align: center;
}
.menu li {
    color:gray;
    padding: 20px;
    font-size: 1rem;
    height: 75px;
    margin-bottom: 20px; 
    border-radius: 7%;
    cursor: pointer;
    transition: background-color 0.5s;
}


.list {
    flex-grow: 1;
}

.sidebar .footer {
    margin-top: auto;
    bottom: 50px;
    left: 50px;
    text-align: center;
}



.menu li:hover {
    color: black;
    background-color: orange;
    font-weight: bold;
}

.menu li.active {
    background-color: orange;
    color: black;
    font-weight: bold;
}
</style>