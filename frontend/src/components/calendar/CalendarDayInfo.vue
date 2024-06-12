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
/**
 * CalendarDayInfo Vue.js component that shows transaction details for a specific date.
 * @module CalendarDayInfo
 * @vue-prop {string} createAt - The date of the transactions.
 * @vue-prop {string} userid - The user ID.
 * @vue-prop {Array} transactionDetails - The list of transaction details.
 */
export default {
    name: "CalendarDayInfo",
    data() {
        return {            
            createAt: "",
            /** @type {string} The user ID */
            userid: "",
            /** @type {string} The date of the transactions */
            date: "",
            /** @type {Array<Object>} The list of transaction details */
            transactionDetails: []
        }
    },
    methods: {
        /**
         * Deletes a transaction detail.
         * @param {Object} detail - The transaction detail to delete.
         */
        deletedetail(detail) {
            axios.delete(`http://localhost:3000/deposit/${detail.id}`);
            this.store.delete(detail);
            this.transactionDetails = this.store.getDailyDetails(this.date);
            console.log(this.transactionDetails);
        },
        /**
         * Navigates back to the previous page.
         */
        check() {
            this.$router.back();
        },
    },
    mounted() {
        this.createAt = this.$route.params.createAt;
        this.date = this.createAt;
        this.transactionDetails = this.store.getDailyDetails(this.date);
        this.createAt = this.createAt.split("-");
        console.log(this.transactionDetails);
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