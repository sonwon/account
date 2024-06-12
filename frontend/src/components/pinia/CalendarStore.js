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
        delete(calendar) {
            this.CalendarList.splice(this.CalendarList.indexOf(calendar), 1);
        },
        push(CalendarList) {
            this.CalendarList.push(CalendarList);
        },
    }
}) 