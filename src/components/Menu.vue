<template>
  <a-select
    ref="select"
    class="clsMenu"
    v-model:value="SelectedAplication"
    label-in-value
    style="width: 218px"

    :options="optionAplications"
    placeholder="Seleccione Una Aplicación"
    @change="handleChangeAplcation"
  >
  </a-select>

  <a-tree
    class="clsSubMenu"
    :tree-data="MenuTree"
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
    v-model:checkedKeys="checkedKeys"
  >
    <template #title0010><span style="color: #1890ff">sss</span></template>
  </a-tree>
</template>
<script>
import { useStore } from "vuex";
import { defineComponent, computed, ref, watch } from "vue";

import Swal from "sweetalert2";
import GetDataServices from "../store/services/GetDataServices";
import router from "../router/index";

export default defineComponent({
  name: "VSMneu",
  setup() {
    const store = useStore();
    const mDataUser = store.DataUser;

    const RouterLink = async (pRouter) => {
      //router.getRoutes(): obtiene una matriz con todos los
      let mpath = "";
      try {
        // console.log("RouterLink router 1", pRouter);
        mpath = pRouter.path;
      } catch (error) {
        console.log("que gueva error ", error);
      }
      // pa mañana https://next.router.vuejs.org/guide/advanced/dynamic-routing.html#adding-routes
      console.log("RouterLink router mpath ", mpath);

      await router.push(mpath);

      // console.log("RouterLink", {
      //   Option: pRouter.intId,
      //   Parent: pRouter.intPadre,
      //   Label: pRouter.strCaption,
      //   path: pRouter.path,
      // });
      store.dispatch("ActFormulario", {
        Option: pRouter.intId,
        Parent: pRouter.intPadre,
        Label: pRouter.strCaption,
      });
    };
    const handleChangeAplcation = (value) => {
      // store.dispatch("ActApp", value.value);
      //CargarSuca
      getMenu(value.value);

      console.log(
        "handleChangeAplcation ",
        value.value,
        " SelectedAplication aqui es",
        SelectedAplication.value
      );
    };
    // const optionAplications = ref(store.state.optionAplications); //Jk
    const optionAplications = computed(() => store.state.optionAplications);
    const SelectedAplication = ref([0]);

    const MenuTree = ref([]);
    const expandedKeys = ref();
    const selectedKeys = ref();
    const checkedKeys = ref(MenuTree[0], MenuTree[(0, 0)]);
    watch(expandedKeys, () => {
      // console.log("expandedKeys", expandedKeys);
    });
    watch(selectedKeys, () => {
      try {
        // console.log("selectedKeys 0 ", selectedKeys);
        // console.log("selectedKeys 1 ", Object.values(selectedKeys));
        // console.log(" selectedKeys 2 ", Object.values(selectedKeys)[3]);
        let OptionLink = Object.values(selectedKeys)[3][0];
        // console.log(" selectedKeys 2 ", treeMenu);

        let OptionSelected = treeMenu.OpcionesMenu.filter(
          (element) => element.intId == OptionLink
        );
        //reduce object.value(objeto).reduce((acc,{varasumar}) =>(acc+varasumar))
        // console.log(
        //   "Miremos si lo encontro",
        //   OptionLink,
        //   "encontró ?",
        //   treeMenu.OpcionesMenu.hasOwnProperty(OptionLink)
        // );
        // console.log(
        //   "gter ",
        //   store.getters.getFormulario,
        //   " usuario ",
        //   store.getters.GetUSER,
        //   " OptionSelected ",
        //   OptionSelected
        // );
        if (OptionSelected.length > 0) RouterLink(OptionSelected[0]);
      } catch (error) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }
    });
    watch(checkedKeys, () => {
      console.log("checkedKeys chequjjj", checkedKeys);
    });

    let treeMenu = ref([]);
    const getMenu = async (idApp) => {
      const ObtenerHijos = (Opciones) => {
        let mMenuTree = [];
        Opciones.forEach((element) => {
          mMenuTree.push({
            title: element.strCaption,
            key: element.intId,
            path: element.path,
          });
        });
        return mMenuTree;
      };

      // console.log(
      //   "ojo a cargar menu parametros fijos  idUser  mDataUser ",
      //   mDataUser
      // );
      // console.log("user key GetUSER ", store.getters.GetUSER);
      // console.log("user key Cia ", store.getters.GettersCIA);
      treeMenu = await GetDataServices(
        "AdmonSystem",
        {
          idUser: store.getters.GetUSER.intIdUsuario,
          intUsuario: store.getters.GetUSER.intIdUsuario,
          intIdApp: idApp,
          Transaction: "LoadParametros",
          ExecuteQuery: "ObtenerMenuAplicacion",
        },
        false
      );
      // treeMenu = await mtreeMenu;
      MenuTree.value = [];
      if (treeMenu == undefined) return;
      let Opciones = [];
      treeMenu.Menu.forEach((elementPadre) => {
        Opciones = treeMenu.OpcionesMenu.filter(
          (element) => element.intPadre == elementPadre.intId
        );

        MenuTree.value.push({
          title: elementPadre.strCaption,
          key: elementPadre.intId,
          children: ObtenerHijos(Opciones),
        });
      });
    };
    return {
      store,
      mDataUser,
      handleChangeAplcation,
      SelectedAplication,
      optionAplications,

      treeMenu,
      MenuTree,
      // getMenu,
      expandedKeys,
      selectedKeys,
      checkedKeys,
      // store solo se devuelve lo que se va a utilizar en la vista
    };
  },
});
</script>
<style scope="this api replaced by slot-scope in 2.5.0+">
.clsMenu{
  background-color: crimson;
  width: 218px;
}
.clsSubMenu {
  top: 50px;
  width: 150%;
  padding: 15px 20px;
  background-color: gray;
  color: #fff;
  font-size: 20px;
  border-radius: 4px;
}
</style>
