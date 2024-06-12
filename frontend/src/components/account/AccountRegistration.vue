<template>
    <div class="container mt-3 registration-outer">
        <!--가계부 등록 페이지 날짜, 금액, 입/출금, 카테고리, 메모를 기입후 등록한다-->
        <h3>입출금 등록</h3>
        <form @submit.prevent="submit">
            <div class="mb-5 mt-3">
                <label class="form-label">날짜 : &ensp;</label>
                <input class="year-input" type="text" v-model="year">&ensp;-&ensp;
                <input class="month-input" type="text" v-model="month">&ensp;-&ensp;
                <input class="day-input" type="text" v-model="day">
            </div>
            <div class="mb-5 mt-3">
                현재 금액 : <b>{{ this.balance }}</b>
            </div>
            <div class="mb-5 mt-3 select">
                <input type="radio" v-model="type" name="type" id="deposit" value="입금" checked><label for="deposit">입금</label>
                <input type="radio" v-model="type" name="type" id="withdraw" value="출금"><label for="withdraw">출금</label>
            </div>
            <div class="mb-5 mt-3">
                <label class="form-label">금액 :</label>
                <input class="form-control" type="text" v-model="amount">
            </div>
            <div class="mb-5 mt-3">
                <label class="form-label">카테고리 :</label>
                <select class="form-select" v-model="category">
                    <option v-for="option in options">{{ option }}</option>
                </select>
            </div>
            <div class="mb-5 mt-3">
                <label for="content">메모 : </label>
                <textarea class="form-control" rows="5" id="content" v-model="content"></textarea>
            </div>
            <div class="mt-3 btn-outer">
                <input class="btn btn-warning btn-submit" type="submit"/>
                <button class="btn btn-secondary btn-cancel" @click.prevent="cancel">취소</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name : 'AccountRegistration',
    data(){
        return{
            userId : "",
            date : "",
            year : "",
            month : "",
            day : "",
            type : "입금",
            amount : 0,
            options : [
                "생활금", "공과금", "월급"
            ],
            category : "",
            content : "",
            balance : 0
        }
    },
    mounted(){
        //localstorage에 저장된 로그인된 userId 가져오기
        this.userId = localStorage.getItem("userId");

        //현재 날짜를 받아와서 날짜 입력칸 초기화하기
        let date = new Date();
        let getYear = date.getFullYear();
        this.year = getYear;

        let getMonth = date.getMonth()+1;
        getMonth = getMonth<10 ? "0"+getMonth : getMonth;
        this.month = getMonth;

        let getDate = date.getDate();
        getDate = getDate<10 ? "0"+getDate : getDate;
        this.day = getDate;

        //jsonserver에서 해당 userId의 balance(현재 금액) 가져오기
        const url = "/api";
        axios.get(url+`/users/${this.userId}`)
        .then((res)=>{
            this.balance = res.data.balance;
        })
        .catch((err)=>console.log(err))
    },
    methods:{
        submit : function(){
            //v-model로 받은 값들을 json서버 deposit에 post하는 함수
            let getMonth = this.month.length < 2 ? "0"+this.month : this.month;
            let getDay = this.day.length < 2 ? "0"+this.day : this.day; 
            this.date = this.year+"-"+getMonth+"-"+getDay;

            console.log("폼 제출");
            console.log(this.date);
            console.log(this.type);
            console.log(this.amount);
            console.log(this.category);
            console.log(this.content);

            const url = "/api"
            const data = {
                'userId' : this.userId,
                'type' : this.type,
                'amount' : parseInt(this.amount),
                'createAt' : this.date,
                'category' : this.category,
                'content' : this.content
            }

            axios.post(url+'/deposit', data)
            .then((res)=>{
                //post 성공시 user의 balance를 업데이트하기
                let updateBalance = parseInt(this.balance);
                if(this.type === "입금"){
                    updateBalance += parseInt(this.amount);
                }
                else{
                    updateBalance -= parseInt(this.amount);
                }
                axios.patch(url+`/users/${this.userId}`, { 'balance' : parseInt(updateBalance)})
                .then((res)=>{
                    alert("가계부 등록 성공!");
                    //등록 성공후 통계화면으로 이동
                    this.$router.push({name : 'accountStatistics'});
                })
                .catch((err)=>console.log(err));
            })
            .catch((err)=>console.log(err))
        },
        cancel : function(){
            
            this.$router.push({name : 'accountStatistics'});
        }
    }
}
</script>
<style scoped>
    .registration-outer{
        width: 800px;
    }
    .select{
        padding : 15px 10px;
    }
    .select input[type=radio]{
        display: none;
    }
    .select input[type=radio]+label{
        display: inline-block;
        cursor: pointer;
        height: 30px;
        width: 120px;
        border : 1px solid #333;
        border-radius: 20px;
        line-height: 30px;
        text-align: center;
        font-weight: bold;
        font-size: 13px;
        margin-right: 30px
    }
    .select input[type=radio]+label{
        background-color: #fff;
        color: black;
    }
    .select input[type=radio]:checked+label{
        background-color: #F7A50C;
        color:#fff;
    }
    .btn-submit{
        width : 150px;
        margin-right: 50px;
    }
    .btn-cancel{
        width : 150px;
    }
    .year-input{
        width : 80px;
        border-radius: 10px;
    }
    .month-input{
        width : 40px;
        border-radius: 10px;
    }
    .day-input{
        width : 40px;
        border-radius: 10px;
    }
</style>