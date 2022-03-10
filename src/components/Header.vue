<template>
  <div class="demo-page-header">
    <a-page-header
      :ghost="false"
      class="clsHeader"
    >
    <template #title ><span class="clsVSFondo">{{DataCia.strSigla}} {{DataUser.NombreSuca}} </span></template>
      <template #extra>
        <a-button key="3" @click="Salir">Salir</a-button>
        <a-button key="2">Operation</a-button>
        <a-button key="1" type="primary">Primary</a-button>
        <span class="clsVSFondo">{{DataUser.NombreUsuario}}</span>        
      </template>
    </a-page-header>

  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { computed, defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import router from "../router/index";

export default defineComponent({
  name: "VSHeader",
  components: {},
  setup() {
    const store = useStore();
    const DataUser = computed(() => store.getters.GetUSER);
    const DataCia = computed(() => store.getters.GettersCIA);
    const Salir = () =>{
      console.log("salir  ,Ebo invor DB Logout")
      window.location.assign("https://www.google.com");      
    }    
    return { store, DataUser,DataCia ,Salir};
  },
});
</script>
<style scoped>
.demo-page-header :deep(tr:last-child td) {
  padding-bottom: 0;
}
.clsVSFondo{
    background-color: red;
  font-size: 20px;
  color: #ffffff;
}
.clsHeader {
  /* background-color: blue;
  padding: 24px; */
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px 15px;
  background-color: red;
  font-size: 20px;
  color: #ffffff;
}
</style>
