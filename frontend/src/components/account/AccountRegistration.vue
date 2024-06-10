<template lang="">
    <div class="container mt-3">
        <h3>입출금 등록</h3>
        <form @submit.prevent="submit">
            <div class="mb-3 mt-3">
                <label class="form-label">날짜 :</label>
                <input class="form-control" type="text" v-model="date">
            </div>
            <div class="mb-3 mt-3 select">
                <input type="radio" name="type" id="deposit" checked><label for="deposit">입금</label>
                <input type="radio" name="type" id="withdraw"><label for="withdraw">출금</label>
            </div>
            <div class="mb-3 mt-3">
                <label class="form-label">금액 :</label>
                <input class="form-control" type="text" v-model="amount">
            </div>
            <div class="mb-3 mt-3">
                <label class="form-label">카테고리 :</label>
                <select class="form-select" v-model="category">
                    <option v-for="option in options">{{ option }}</option>
                </select>
            </div>
            <div class="mb-3 mt-3">
                <label for="content">메모 : </label>
                <textarea class="form-control" rows="5" id="content" v-model="content"></textarea>
            </div>
            <input class="btn btn-warning btn-submit" type="submit"/>
            <button class="btn btn-secondary btn-cancel">취소</button>
        </form>
    </div>
</template>
<script>
export default {
    name : 'AccountRegistration',
    data(){
        return{
            userId : 1,
            date : "",
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
        let getMonth = date.getMonth()+1;
        getMonth = getMonth<10 ? "0"+getMonth : getMonth;
        let getDate = date.getDate();
        getDate = getDate<10 ? "0"+getDate : getDate;
        this.date = getYear+"-"+getMonth+"-"+getDate;
    },
    methods:{
        submit : function(){
            console.log("폼 제출");
            console.log(this.category);
        }
    }
}
</script>
<style scoped>
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
</style>