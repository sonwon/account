<template>
    <div class="container mt-3 registration-outer">
        <h3>입출금 등록</h3>
        <form @submit.prevent="submit">
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
            userId : 1,
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
            content : ""
        }
    },
    mounted(){
        let date = new Date();
        let getYear = date.getFullYear();
        this.year = getYear;

        let getMonth = date.getMonth()+1;
        getMonth = getMonth<10 ? "0"+getMonth : getMonth;
        this.month = getMonth;

        let getDate = date.getDate();
        getDate = getDate<10 ? "0"+getDate : getDate;
        this.day = getDate;
    },
    methods:{
        submit : async function(){
            this.date = this.year+"-"+this.month+"-"+this.day;

            console.log("폼 제출");
            console.log(this.date);
            console.log(this.type);
            console.log(this.amount);
            console.log(this.category);
            console.log(this.content);

            const url = "/api/deposit"
            const data = {
                'userId' : this.userId,
                'type' : this.type,
                'amount' : this.amount,
                'createAt' : this.date,
                'category' : this.category,
                'content' : this.content
            }

            await axios.post(url, data)
            .then((res)=>{
                alert("가계부 등록 성공!");
                this.$router.push({name : 'accountStatistics'});
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