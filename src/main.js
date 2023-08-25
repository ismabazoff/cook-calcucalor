/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";
// Composables
import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);
library.add(fas);
registerPlugins(app);

app.component("fa", FontAwesomeIcon).mount("#app");
