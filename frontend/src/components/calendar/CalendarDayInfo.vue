<template>
    <div class="modal">
        <div class="box">
            <div align="center" class="date">
                <p class="createAt">{{ createAt[0] }}년</p>
                <p class="createAt">{{ createAt[1] }}월</p>
                <p class="createAt">{{ createAt[2] }}일</p>
            </div>
            <div class="information">
                <ul>
                    <li class="item" v-for="detail in transactionDetails" :key="detail.index">
                        [{{ detail.title }}][{{ detail.type }} {{ detail.amount }}] {{ detail.content }}
                        <button style="width:70px" class="btn btn-danger" @click="deletedetail(detail)">삭제</button>
                    </li>
                </ul>
            </div>
            <div class="btn">
                <button style="width: 40%;" class="btn btn-warning" @click="check">확인</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { useCalendarStore } from "../pinia/CalendarStore";
export default {
    name: "CalendarDayInfo",
    data() {
        return {
            createAt: "",
            userid: "",
            date: "",
            transactionDetails: []
        }
    },
    methods: {
        deletedetail : async function (detail) {
            await axios.delete(`http://localhost:3000/deposit/${detail.id}`);
            this.store.delete(detail);

            this.transactionDetails = this.store.getDailyDetails(this.date);
            try{
                let userJson = await axios.get(`/api/users/${this.userid}`);
                let balance = parseInt(userJson.data.balance);
                if(detail.type == '입금'){
                    //입금 삭제 시 amount만큼 빼기
                    balance -= parseInt(detail.amount);
                }
                else{
                    //출금 삭제 시 amount만큼 더하기
                    balance += parseInt(detail.amount);
                }
                await axios.patch(`/api/users/${this.userid}`, {'balance' : balance} )
            }
            catch(err){
                console.log(err);
            }
        },
        check() {
            this.$router.back();
        },
    },
    mounted() {
        this.userid = localStorage.getItem('userId');
        this.createAt = this.$route.params.createAt;
        this.date = this.createAt;
        this.transactionDetails = this.store.getDailyDetails(this.date);
        this.createAt = this.createAt.split("-");
    },
    setup() {
        const store = useCalendarStore();
        return { store }
    }
}
</script>
<style scoped>
.key {
    float: left;
    width: 50%;
    text-align: right;
    padding-right: 5%;
}

.value {
    float: left;
    width: 50%;
    text-align: left;
    padding-left: 5%;
}

.information {
    padding-top: 30px;
    font-size: 1.32rem
}

.btn {
    width: 100%;
    text-align: center
    
}

.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.item {
    margin-bottom: 15px;
}

.box {
    background-color: white;
    margin: 80px auto;
    max-width: 500px;
    min-width: 100px;
    min-height: 150px;
    /* font: 13px "verdana"; */
    padding: 10px 10px 10px 10px;
    overflow-y: 'scroll';
}

.createAt {
    display: inline-block;
    padding: 10px;
}

.date {
    font-size: 1.5rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
</style>