import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/styles/main.css";
import 'sweetalert2/dist/sweetalert2.min.css';
import App from "@/App.vue";
import router from "@/router";
import VueSweetalert2 from 'vue-sweetalert2';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(VueSweetalert2);
app.use(router);
app.mount("#jbpc-admin-menu");
