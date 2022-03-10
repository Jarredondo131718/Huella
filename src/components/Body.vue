<template>
  <login v-if="DataUser.lngNumIdTerc == 0" />

  <a-layout
    id="components-layout-demo-top-side-2"
    v-show="store.state.Formulario.Option == 0 && DataUser.lngNumIdTerc > 0"
  >
    <a-layout>
      <a-layout-sider
        class="VSMenu"
        v-show="false"
        v-model:collapsed="collapsed"
        collapsible
        @click="gueva"
        width="250"
      >
        <Menu></Menu>
      </a-layout-sider>
      <a-layout
        style="padding: 0 24px 24px"
        v-show="store.state.Formulario.Option == 0"
      >
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '18px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <a-row>
            <a-col :span="24">
              <Huella v-if="true"></Huella>
            </a-col>
          </a-row>
          <a-row type="flex" class="VScontent">
            <!-- <a-col :span="4"></a-col> -->
            <a-col :span="8">
              <a-card style="width: 240px" class="VSCar1">
                <template #title
                  ><span style="color:white;">Captaciones Día</span></template
                >
                <p @click="Guevita">Disponibles: 50.000.000</p>
                <p>Contractuales: 150.000.000</p>
                <p>CDATS: 550.000.000</p>
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card style="width: 240px" class="VSCar2">
                <template #title
                  ><span style="color:white;">Captaciones Mes</span></template
                >
                <p @click="Guevita">Disponibles: 240.000.000</p>
                <p>Contractuales: 350.000.000</p>
                <p>CDATS: 850.000.000</p>
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card style="width: 240px" class="VSCar3">
                <template #title
                  ><span style="color:white;">Captaciones Año</span></template
                >
                <p @click="Guevita">Disponibles: 650.000.000</p>
                <p>Contractuales: 750.000.000</p>
                <p>CDATS: 1.550.000.000</p>
              </a-card>
            </a-col>
          </a-row>
          <a-divider />
          <a-row type="flex">
            <!-- <a-col :span="4"></a-col> -->
            <a-col :span="8">
              <a-card style="width: 240px" class="VSCar1">
                <template #title
                  ><span style="color:white;">Colocaciones Día</span></template
                >
                <p @click="Guevita">Cartera A: 50.000.000</p>
                <p>Cartera B: 150.000.000</p>
                <p>Cartera C: 550.000.000</p>
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card style="width: 240px" class="VSCar2">
                <template #title
                  ><span style="color:white;">Colocaciones Mes</span></template
                >
                <p @click="Guevita">Cartera A: 240.000.000</p>
                <p>Cartera B: 350.000.000</p>
                <p>Cartera C: 850.000.000</p>
              </a-card>
            </a-col>
            <a-col :span="8">
              <a-card style="width: 240px" class="VSCar3">
                <template #title
                  ><span style="color:white;">Colocaciones Año</span></template
                >
                <p @click="Guevita">Cartera A: 650.000.000</p>
                <p>Cartera B: 750.000.000</p>
                <p>Cartera C: 1.550.000.000</p>
              </a-card>
            </a-col>
          </a-row>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { ref } from "@vue/reactivity";
import { computed, defineComponent, reactive } from "vue";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from "@ant-design/icons-vue";
import { useStore } from "vuex";
import Menu from "./Menu.vue";
import Login from "@/components/Login.vue";
import Huella from "@/components/Huella.vue";
export default defineComponent({
  name: "VSBody",
  components: {
    Menu,
    Huella,
    Login,
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  },
  setup() {
    const store = useStore();
    const DataUser = computed(() => store.getters.GetUSER);
    const collapsed = ref(false);
    const gueva = () => {
      store.dispatch("ActCollapsed", true);
      // console.log("gueva",collapsed,' col sto ',store.state.collapsed)
    };
    const Guevita = () => {
      store.dispatch("ActCollapsed", !store.state.collapsed);
      console.log(" Guevita ", collapsed.value);
      collapsed.value = !collapsed.value;
    };
    return { Menu, store, DataUser, collapsed, gueva, Guevita };
  },
});
</script>
<style scoped>
.VSMenu {
  margin-top: 80px;
  background: #fff;
  z-index: 1;
}
.VScontent {
  margin-top: 75px;
}
.VSCar1 {
  background-color: rgb(39, 53, 14);
  border-radius: 8px;
  color: white;
}
.VSCar2 {
  background-color: rgb(238, 11, 170);
  border-radius: 8px;
  color: white;
}
.VSCar3 {
  background-color: rgb(34, 11, 238);
  border-radius: 8px;
  color: white;
}

#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
