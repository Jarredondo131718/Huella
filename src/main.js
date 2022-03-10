import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import { ElButton } from 'element-plus'
import { ElTable } from 'element-plus'
import { ElDialog  } from 'element-plus'
import mitt from 'mitt'
const eventBus = mitt()

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import  VueGoogleMaps from '@fawmi/vue-google-maps'
const app = createApp(App)
// app.config.globalProperties.$ELEMENT = option
app.config.globalProperties.eventBus = eventBus
app
.use(VueGoogleMaps, {
  load: {
      key: 'AIzaSyB69KTubkIDjTZ2oUtcHuA4qJITnvEMCFE',
      libraries: "places"
  },
})
  .use(store)

  .use(ElButton)
  .use(ElTable) 
  .use(ElDialog) 
  // .use(ElementPlus)    
  .use(Antd)  
  .use(router)
  .mount("#app");
