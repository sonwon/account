<template>
    <div class="modal">
        <div class="box">
            <div align="center" class="date">
                <p class="createAt">{{ createAt[0] }}년</p>
                <p class="createAt">{{ createAt[1] }}월</p>
                <p class="createAt">{{ createAt[2] }}일</p>
            </div>
            <div class="information">
                <div class="key">
                    <p>금액</p>
                    <p>내역</p>
                    <p>카테고리</p>
                    <p>메모</p>
                </div>
                <div class="value">
                    <p>{{ amount }}원</p>
                    <p>{{ type }}</p>
                    <p>{{ category }}</p>
                    <p>{{ content }}</p>
                </div>
            </div>
            <div class="btn">
                <button class="btn btn-success" @click="update">수정</button>
                <button class="btn btn-light" @click="check">확인</button>
            </div>

        </div>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name: "CalendarInfo",
    data() {
        return {
            amount: "",
            createAt: [],
            type: "",
            category: "",
            content: "",
            backgroundColor: "",
            backgroundColor2: "",
            accountId : ""
        }
    },
    methods: {
        check() {
            this.$router.back();
        },
        info() {
            let url = 'http://localhost:3000/deposit?id=' + this.$route.params.id;
            const getDeposit = async () => {
                try {
                    let result = await axios.get(url, {});
                    let list = await result.data;
                    let getEvent = [];
                    for (let count in list) {
                        let deposit = list[count];
                        this.amount = deposit.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        this.createAt = deposit.createAt.split("-");
                        this.type = deposit.type;
                        this.category = deposit.category;
                        this.content = deposit.content;
                        this.backgroundColor = this.type == "입금" ? "btn btn-warning" : "btn btn-secondary";
                        this.backgroundColor2 = this.type == "출금" ? "btn btn-warning" : "btn btn-secondary";
                        this.accountId = list[count].id;
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
            getDeposit();
        },
        update(){
            this.$router.push({name:'accountUpdate/accountId', params:{'accountId' : this.accountId}})
        }
    },
    mounted() {
        this.info();
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
    width:100%;
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

.box {
    background-color: white;
    margin: 80px auto;
    max-width: 500px;
    min-width: 100px;
    min-height: 350px;
    /* font: 13px "verdana"; */
    padding: 10px 10px 10px 10px;
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


<!-- <div>
                <button :class="backgroundColor" disabled>입금</button>
                <button :class="backgroundColor2" disabled>출금</button>
            </div>
            <div class="amount">
                <p>금액</p>
                <p>{{ amount }}</p>
            </div>
            <div class="category">
                <p>카테고리 :{{ category }}</p>
            </div class="amount">
            <div class="content">
                <p>메모 :{{ content }}</p>
            </div>
            <div class="btn btn">
                <button class="btn btn-info">수정</button>
                <button class="btn btn-light" @click="check">확인</button>
            </div> -->