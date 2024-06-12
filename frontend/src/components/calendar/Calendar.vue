<template>
    <div class="view">
        <div class="FullCalendar">

            <FullCalendar :options="calendarOptions" />
        </div>
        <div class="filters">
            <label>
                <select style="background-color: white;" class="form-select" v-model="selectedEventType"
                    @change="filterEvents">
                    <option value="">모든 내역</option>
                    <option value="입금">입금</option>
                    <option value="출금">출금</option>
                </select>
            </label>
            <label class="selectbtn">
                <button :style="{ backgroundColor: utilitiesClicked ? 'orange' : 'white' }" class="btn btn-light"
                    @click="catagoryClick">공과금</button>
                <button :style="{ backgroundColor: salaryClicked ? 'orange' : 'white' }" class="btn btn-light"
                    @click="catagoryClick">월급</button>
                <button :style="{ backgroundColor: livingClicked ? 'orange' : 'white' }" class="btn btn-light"
                    @click="catagoryClick">생활금</button>
                <button :style="{ backgroundColor: etcClicked ? 'orange' : 'white' }" class="btn btn-light"
                    @click="catagoryClick">기타</button>

            </label>
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
            selectedEventType: '',
            originalEvents: [],
            utilitiesClicked: false,
            livingClicked: false,
            etcClicked: false,
            salaryClicked: false,
            ClickedList: [],
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
                dayCellClassNames: this.dayCellClassNames,
                headerToolbar: { // 추가: headerToolbar 옵션
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay,today'
                },
            }
        }
    },
    methods: {
        catagoryClick(event) {
            const buttonText = event.target.textContent; // 클릭된 버튼의 텍스트     
            switch (buttonText) {
                case '공과금':
                    if (this.utilitiesClicked) {
                        this.utilitiesClicked = false;
                        this.ClickedList.splice(this.ClickedList.indexOf(buttonText), 1);
                    }
                    else {
                        this.utilitiesClicked = true;
                        this.ClickedList.push(buttonText);
                    }                    
                    break;
                case '월급':
                    if (this.salaryClicked) {
                        this.salaryClicked = false;
                        this.ClickedList.splice(this.ClickedList.indexOf(buttonText), 1);
                    }
                    else {
                        this.salaryClicked = true;
                        this.ClickedList.push(buttonText);
                    }                    
                    break;
                case '생활금':
                    if (this.livingClicked) {
                        this.livingClicked = false;
                        this.ClickedList.splice(this.ClickedList.indexOf(buttonText), 1);
                    }
                    else {
                        this.livingClicked = true;
                        this.ClickedList.push(buttonText);
                    }                    
                    break;
                case '기타':
                    if (this.etcClicked) {
                        this.etcClicked = false;
                        this.ClickedList.splice(this.ClickedList.indexOf(buttonText), 1);
                    }
                    else {
                        this.etcClicked = true;
                        this.ClickedList.push(buttonText);
                    }
                    break;
            }
            
            if (this.selectedEventType) {
                if (this.ClickedList.length != 0) this.calendarOptions.events = this.originalEvents.filter(event => event.type === this.selectedEventType).filter(event => this.ClickedList.indexOf(event.title) !== -1); // ClickedList에 포함된 이벤트들만 필터링
                else if (this.ClickedList.length == 0) this.calendarOptions.events = this.originalEvents.filter(event => event.type === this.selectedEventType);
            } else {             
                if (this.ClickedList.length != 0) this.calendarOptions.events = this.originalEvents.filter(event => this.ClickedList.indexOf(event.title) !== -1); // ClickedList에 포함된 이벤트들만 필터링
                else if (this.ClickedList.length == 0) this.calendarOptions.events = this.originalEvents.filter(event => event.type === this.selectedEventType);
            }            


        },
        filterEvents() {
            console.log(this.originalEvents.filter(event => event.type === this.selectedEventType));
            if (this.selectedEventType) {
                this.calendarOptions.events = this.originalEvents.filter(event => event.type === this.selectedEventType);
            } else {
                this.calendarOptions.events = this.originalEvents;
            }
        },
        handleEventClick(clickInfo) {
            //라우터 연결 부분, 추후 라우터 가드 설정하기. id가 사용자 id가 맞는지 확인
            this.$router.push({ name: 'Calendar/id', params: { id: clickInfo.event.id } })
        },
        handleDateClick(clickInfo) {
            this.$router.push({ name: 'Calendar/day', params: { createAt: clickInfo.dateStr, userId: this.userid } })
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
                for (let count in list) {
                    let deposit = list[count];
                    let color = deposit.type === "입금" ? "#307007" : "red"
                    this.store.push({ "title": deposit.category, "date": deposit.createAt, "backgroundColor": color, "id": deposit.id, "type": deposit.type, "amount": deposit.amount, "content": deposit.content })
                }
                this.originalEvents = this.store.CalendarList;
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
.fc .today {
    background-color: #D1E7DD !important;
}

.view {
    display: flex
}

.filters {
    padding-top: 10%;
    /* float: top; */
}

button {
    width: 100px;
    height: 100px;
}

.selectbtn {
    margin-top: 50px;
    width: 90px;

}

.selectbtn button {
    margin-bottom: 20px;
}

.FullCalendar {
    padding-top: 5%;
    max-width: 1500px;
    min-width: 1500px;
}

label {
    margin-left: 20px
}

</style>
