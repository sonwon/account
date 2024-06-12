<template>
    <div class="container mt-3 update-outer">
        <!--가계부 등록과 동일한 템플릿의 가계부 수정 컴포넌트 날짜, 입금/출금, 금액, 카테고리, 메모를 변경할 수 있다-->
        <h3>가계부 수정</h3> <br>
        <form @submit.prevent="update">
            <div class="mb-5 mt-3">
                <label class="form-label">날짜 : &ensp;</label>
                <input class="year-input" type="text" v-model="year">&ensp;-&ensp;
                <input class="month-input" type="text" v-model="month">&ensp;-&ensp;
                <input class="day-input" type="text" v-model="day">
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
                <input class="btn btn-warning btn-submit" type="submit" value="수정"/>
                <button class="btn btn-secondary btn-cancel" @click.prevent="cancel">취소</button>
            </div>
        </form>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name : "AccountUpdate",
    data(){
        return{
            accountId : "",
            userId : "",
            date : "",
            month : "",
            day : "",
            type : "",
            oldType : "",
            amount : 0,
            oldAmount : 0,
            options : [
                "생활금", "공과금", "월급"
            ],
            category : "",
            content : "",
            balance : 0
        }
    },
    mounted(){
        //해당 가계부 id를 라우트의 params로 받아온다
        this.accountId = this.$route.params.accountId;

        const url = "/api";
        const httpRequest = async ()=>{
            try{
                //받아온 가계부 id로 가계부의 값들을 가져와서 변수를 초기화한다
                let res = await axios.get(url+`/deposit/${this.accountId}`);
                let data = res.data;
                this.userId = data.userId;
                let createAt = data.createAt;
                let arrayDate = createAt.split('-');
                this.year = arrayDate[0];
                this.month = arrayDate[1];
                this.day = arrayDate[2];
                this.type = data.type;
                this.oldType = data.type;
                this.amount = data.amount;
                this.oldAmount = data.amount;
                this.category = data.category;
                this.content = data.content;

                //유저의 balance도 변경할 수 있게 가져온다
                res = await axios.get(url+`/users/${this.userId}`);
                data = res.data;
                this.balance = data.balance;
            }
            catch(err){
                console.log(err)
            }
        }
        httpRequest();
    },
    methods: {
        update : function(){
            //수정 버튼을 클릭 시 변경된 값들을 json 서버에 patch하여 반영한다.
            console.log("업데이트 버튼")
            this.date = this.year+"-"+this.month+"-"+this.day;
            const data = {
                'userId' : this.userId,
                'type' : this.type,
                'amount' : parseInt(this.amount),
                'createAt' : this.date,
                'category' : this.category,
                'content' : this.content
            }
            const url = "/api";
            axios.put(url+`/deposit/${this.accountId}`, data)
            .then((res)=>{
                //값이 바뀌면 유저의 balance도 변경해준다.
                let updateBalance = this.oldType === "입금" ? parseInt(this.balance) - parseInt(this.oldAmount) : parseInt(this.balance) + parseInt(this.oldAmount);
                if(this.type === "입금"){
                    updateBalance += parseInt(this.amount);
                }
                else{
                    updateBalance -= parseInt(this.amount);
                }
                axios.patch(url+`/users/${this.userId}`, {'balance' : parseInt(updateBalance)})
                .then((res)=>{
                    alert("가계부 수정 성공!");
                    //가계부 수정 성공시 수정하기 전 컴포넌트인 Calendar로 이동한다.
                    this.$router.push({name : 'Calendar'});
                })
                .catch((err)=>console.log(err));
            })
        },
        cancel : function(){
            //취소하면 이전 컴포넌트로 이동
            this.$router.back();
        }
    }
}
</script>
<style scoped>
    .update-outer{
        width : 800px;
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