<template>
    <div>
        <div class="FullCalendar">
            <FullCalendar :options="calendarOptions" />
        </div>
        <router-view />
    </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from "axios";

export default {
    name: "Calendar",
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    data() {
        return {
            userid: 1,
            calendarOptions: {
                height: 700,
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                editable: true,
                selectable: true,
                selectMirror: true,
                eventClick: this.handleEventClick,
                dateClick: this.handleDateClick,
                locale: 'ko', //언어 설정,
                events: [
                    { title: "08:05:22", date: '2024-08-08', backgroundColor: "#307007" },
                    { title: "08:05:22", date: '2024-08-09', backgroundColor: "#307007" },
                ]
            }
        }
    },
    methods: {
        handleEventClick(clickInfo) {
            //라우터 연결 부분, 추후 라우터 가드 설정하기. id가 사용자 id가 맞는지 확인
            this.$router.push({ name: 'Calendar/id', params: { id: clickInfo.event.id } })
        },
        handleDateClick(clickInfo) {
            this.$router.push({ name: 'Calendar/day', params: { createAt: clickInfo.dateStr, userId: this.userid  } })
            // 거래 등록 추가?
        }
    },
    mounted() {
        let url = 'http://localhost:3000/deposit?userId=' + this.userid;
        const getDeposit = async () => {
            try {
                console.log(url);
                let result = await axios.get(url, {});
                let list = await result.data;
                console.log(list[0]);
                let getEvent = [];
                for (let count in list) {
                    let deposit = list[count];
                    console.log(deposit);
                    let color = deposit.type === "입금" ? "#307007" : "red"
                    console.log("deposit.createAt = " + deposit.createAt);
                    this.calendarOptions.events.push({ "title": deposit.category, "date": deposit.createAt, "backgroundColor": color, "id": deposit.id})
                }
                this.calendarOptions.events.push(getEvent);
                console.log(this.calendarOptions.events);
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
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}
.FullCalendar{
    padding-top: 20%;
    padding-left: 30%;
    width: 700%;
}
a {
    color: #42b983;
}
</style>
