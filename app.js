const app = Vue.createApp({
    data() {
        return {
            Button: true
        }
    },
    methods: {
        toggleButton() {
            this.Button = !this.Button
        }
    }
})

app.mount('#app')