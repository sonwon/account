import { defineStore } from "pinia"


export const useCalendarStore = defineStore("counter", {
    state: () => ({ 
        CalendarList: []
    }),
    getters: { 
        getDailyDetails: (state) => {
            return (date) => state.CalendarList.filter((calendar) => calendar.date === date)
          }

    },
    actions: { 
        clear(){
            this.CalendarList.splice(0, this.CalendarList.length);
        },
        delete(calendar) {
            this.CalendarList.splice(this.CalendarList.indexOf(calendar), 1);
        },
        push(CalendarList) {
            this.CalendarList.push(CalendarList);
        },
    }
}) 