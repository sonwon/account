<template>
    <div class="modal">
        <div class="box">
            생성
            {{ userid }}
            {{ createAt }}
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    name: "CalendarDayInfo",
    data() {
        return {
            createAt: "",
            userid: "",
            transactionDetails: []
        }
    },
    methods: {
        info() {
        }
    },
    mounted() {
        this.createAt = this.$route.params.createAt;
        this.userid = this.$route.params.userId;
        let url = 'http://localhost:3000/deposit';
        console.log(url);
        const getDeposit = async () => {
            try {
                let result = await axios.get(url, {params: {"userId": this.userid, "createAt" : this.createAt }});
                let list = await result.data;
                console.log(await result.data);
                // let getEvent = [];
                // for (let count in list) {
                //     let deposit = list[count];
                //     this.amount = deposit.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //     // this.createAt = deposit.createAt.split("-");
                //     this.type = deposit.type;
                //     this.category = deposit.category;
                //     this.content = deposit.content;
                //     this.backgroundColor = this.type == "입금" ? "btn btn-warning" : "btn btn-secondary";
                //     this.backgroundColor2 = this.type == "출금" ? "btn btn-warning" : "btn btn-secondary";
                // }
            }
            catch (err) {
                console.log(err);
            }
        }
        getDeposit();
    }
}
</script>
<style scoped>
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
</style>