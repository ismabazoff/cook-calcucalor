/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import { loadFonts } from "./webfontloader";
import vuetify from "./vuetify";
// import pinia from "@/store";
import router from "@/router";
import Modal from "@/components/Modal.vue";
import ButtonCreate from "@/components/UI/Button/ButtonCreate.vue";
import Item from "@/components/UI/Item.vue";
import Overlay from "@/components/UI/Overlay.vue";

export function registerPlugins(app) {
  loadFonts();
  app
    .component("Modal", Modal)
    .component("ButtonCreate", ButtonCreate)
    .component("Item", Item)
    .component("Overlay", Overlay)
    .use(vuetify)
    .use(router);
  // .use(pinia);
}
