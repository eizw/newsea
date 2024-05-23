import '@/assets/tailwind.css'
// import '@/assets/output.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// app.use(createVuetify({
//     // theme: true,
//     components,
//     directives,
// }))
app.component('VueDatePicker', VueDatePicker)
app.use(createPinia())
app.use(router)

app.mount('#app')
