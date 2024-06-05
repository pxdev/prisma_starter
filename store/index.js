import { defineStore } from 'pinia'

// @ts-ignore
export const useMainStore = defineStore('MainStore', {
    state: () => ({
        activeMenu: 1,
        currency: {
            name: 'USD',
            symbol: '$',
        },
        timeFormat: 'HH:mm A',
        dateFormat: 'dddd, DD MMM YYYY',
        selectedEvent: [{}],
    }),

    getters: {
        getSelectedEvent() {
            return this.selectedEvent
        },
    },

    actions: {
        setActiveMenu(value) {
            this.activeMenu = value
        },

        storeSelectedEvent(data) {
            this.selectedEvent = data
        },
    },
})
