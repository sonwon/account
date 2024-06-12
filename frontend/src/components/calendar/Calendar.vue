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
import { useCalendarStore } from '../pinia/CalendarStore';

export default {
    name: "Calendar",
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    data() {
        return {
            userid: "",
            calendarOptions: {
                height: 700,
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                // editable: true,
                selectable: true,
                selectMirror: true,
                eventClick: this.handleEventClick,
                dateClick: this.handleDateClick,
                locale: 'ko', //언어 설정,
                events: [],
                dayCellClassNames: this.dayCellClassNames
            }
        }
    },
    methods: {
        handleEventClick(clickInfo) {
            //라우터 연결 부분, 추후 라우터 가드 설정하기. id가 사용자 id가 맞는지 확인
            this.$router.push({ name: 'Calendar/id', params: { id: clickInfo.event.id } })
        },
        handleDateClick(clickInfo) {
            this.$router.push({ name: 'Calendar/day', params: { createAt: clickInfo.dateStr, userId: this.userid } })
            // 거래 등록 추가?
        },
        dayCellClassNames(arg) {
            const date = arg.date;
            if (date.getDay() === 0 || date.getDay() === 6) {
                return ['weekend'];
            }
            return [];
        }
    },
    mounted() {
        this.userid = localStorage.getItem('userId');
        let url = 'http://localhost:3000/deposit?userId=' + this.userid;
        const getDeposit = async () => {
            try {
                let result = await axios.get(url, {});
                let list = await result.data;
                let getEvent = [];
                for (let count in list) {
                    let deposit = list[count];
                    let color = deposit.type === "입금" ? "#307007" : "red"
                    this.store.push({ "title": deposit.category, "date": deposit.createAt, "backgroundColor": color, "id": deposit.id, "type": deposit.type, "amount": deposit.amount, "content": deposit.content })
                }
                this.calendarOptions.events = this.store.CalendarList;
                console.log(this.store.CalendarList);
            }
            catch (err) {
                console.log(err);
            }
        }
        getDeposit();

    },
    setup() {
        const store = useCalendarStore();
        return { store }
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

.FullCalendar {
    padding-top: 20%;
    padding-left: 15%;
    width: 500%;
}

a {
    color: #42b983;
}
</style>
