import { defineStore } from "pinia"

/**
 * Pinia store for managing calendar-related data.
 * @module useCalendarStore
 */
export const useCalendarStore = defineStore("counter", {
    state: () => ({ 
        /** @type {Array<Object>} List of calendar events */
        CalendarList: []
    }),
    getters: { 
        /**
         * Retrieves daily details from the calendar list.
         * @param {Object} state - The store state
         * @returns {Function} Function that filters calendar events by date
         */
        getDailyDetails: (state) => {
            return (date) => state.CalendarList.filter((calendar) => calendar.date === date)
        }
    },
    actions: { 
        /**
         * Clears the calendar list.
         */
        clear(){
            this.CalendarList.splice(0, this.CalendarList.length);
        },
        /**
         * Deletes a calendar event.
         * @param {Object} calendar - The calendar event to delete
         */
        delete(calendar) {
            this.CalendarList.splice(this.CalendarList.indexOf(calendar), 1);
        },
        /**
         * Adds a new calendar event to the list.
         * @param {Object} calendar - The calendar event to add
         */
        push(CalendarList) {
            this.CalendarList.push(CalendarList);
        },
    }
}) 