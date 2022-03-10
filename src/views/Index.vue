<template>
  <a-layout-content style="   margin-top:20px ;">
    <div class="container">
      DataUser.lngNumIdTerc {{ DataUser.lngNumIdTerc }}
      <a-divider orientation="left">Normal</a-divider>
      <Menu v-if="store.state.optionAplications.length > 0"></Menu>
      <a-row type="flex">
        <a-col :span="6">1 col-order-4</a-col>
        <a-col :span="6">2 col-order-3</a-col>
        <a-col :span="6">3 col-order-2</a-col>
        <a-col :span="6">4 col-order-1</a-col>
      </a-row>

      <a-select
        v-model:value="valueTablaSelect"
        label-in-value
        style="width: 120px"
        :options="optionsTable"
        @change="handleChangeTableSelect"
      >
      </a-select>

      <div class="d-flex justify-content-center mt-5">
        <div class="col-4 col-md-4" v-if="ShowTable.CRUDUsers">
          <div class="card">
            <div class="card-title text-center">
              CRUD
            </div>
            <div class="card-body">
              <form v-on:submit.prevent="actions">
                <div class="mb-3">
                  <input
                    type="text"
                    placeholder="DNI"
                    required
                    class="form-control"
                    v-model="frmUser.strNit"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    class="form-control"
                    v-model="frmUser.Name"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    placeholder="LastName"
                    required
                    class="form-control"
                    v-model="frmUser.LastName"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="Email"
                    placeholder="Email"
                    required
                    class="form-control"
                    v-model="frmUser.Email"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="number"
                    placeholder="Salary"
                    required
                    class="form-control"
                    v-model="frmUser.Salary"
                  />
                </div>
                <a-button type="primary">
                  <template #icon><SearchOutlined /></template>
                  Search
                </a-button>
                <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                  <a-button type="primary" @click="onSubmit">Create</a-button>
                  <a-button style="margin-left: 10px" @click="resetForm"
                    >Reset</a-button
                  >
                </a-form-item>
                <button class="btn btn-success" type="submit">Guardar</button>
                <el-button
                  type="success"
                  icon="el-icon-s-comment"
                  size="mini"
                  @click="actions"
                  title="Save"
                  circle
                ></el-button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-8 col-md-8" v-if="ShowTable.Users">
          <!-- <a-table :dataSource="tblusers" :columns="columnsUsers" /> -->
          <a-table
            :columns="columnsUsers"
            :data-source="tblusers"
            size="middle"
            class="ant-table-striped"
            :rowClassName="(record, index) => rowClassUser(record, index)"
            @change="onChange"
          >
            <template #action="{ record }">
              <!-- <a @click="rowSelectionUser(record)">action</a> -->
              <el-button
                ref="RecordEdit"
                type="success"
                icon="el-icon-edit"
                size="mini"
                @click="rowSelectionUser(record)"
                title="Edit"
                circle
              ></el-button>
            </template>
          </a-table>
        </div>
      </div>

      <div class="col-6 col-md-8" v-if="tblDirecciones.length > 0">
        <a-divider type="vertical" />
        <a-table
          :columns="columnsDirecciones"
          :data-source="tblDirecciones"
          :scroll="{ y: 240 }"
          bordered
        >
        </a-table>
      </div>

      <TablaSort v-if="ShowTable.Sort"></TablaSort>

      <TablaSearch v-if="ShowTable.Search"></TablaSearch>
      <CargarTablaUser v-if="ShowTable.TablaUser"></CargarTablaUser>
      <TablaOperations v-if="ShowTable.Operation"></TablaOperations>
    </div>
  </a-layout-content>
</template>
<script>
import { ref } from "@vue/reactivity";
import { usePagination } from "vue-request";
import { computed, defineComponent, reactive } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";

import GetDataServices from "../store/services/GetDataServices";

// import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import queryString from "qs";

import TablaSort from "./tablaSort.vue";
import TablaOperations from "./TablaOperations.vue";
import TablaSearch from "./TablaSearch.vue";
import Menu from "./Menu.vue";

import CargarTablaUser from "./CargarTablasUsers.vue";
import {
  SearchOutlined,
  EditOutlined,
  SaveOutlined,
  ReloadOutlined,
  SmileOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  Name: "Index",
  components: {
    SmileOutlined,
    DownOutlined,
    SearchOutlined,
    EditOutlined,
    SaveOutlined,
    ReloadOutlined,
    TablaSort,
    TablaSearch,
    TablaOperations,
    CargarTablaUser,
    Menu,
  },
  setup() {
    // const MServicesDB =
    const store = useStore();
    const DataUser = computed(() => store.getters.GetUSER);
    // const SelectedAplication = ref(0)
    const tblusers = ref([{}]);
    const loading = ref(false);
    const pagination = computed(() => ({
      total: 200,
      current: current.value,
      pageSize: pageSize.value,
    }));

    const onSubmit = () => {
      actions();
    };
    const optionAplications = ref([]);
    const optionsTable = ref([
      {
        value: "10",
        label: "Sort",
      },
      {
        value: "20",
        label: "Search",
      },
      {
        value: "30",
        label: "Operation",
      },
      {
        value: "40",
        label: "Menu",
      },
      {
        value: "50",
        label: "User",
      },
      {
        value: "60",
        label: "Table User",
      },
    ]);

    const frmUser = ref({
      lngNumId: 0,
      Name: "",
      LastName: "",
      Email: "",
      Salary: 0,
    });
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      state.searchText = "";
    };
    const tblDirecciones = ref([{}]);

    const columnsUsers = ref([
      {
        title: "Nit",
        dataIndex: "strNit",
        key: "strNit",
        // width: 10,
      },
      {
        title: "Nombre",
        dataIndex: "Name",
        // width: 10,
        key: "Name",
      },
      {
        title: "Apellido",
        dataIndex: "LastName",
        key: "LastName",
        // width: 10,
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 100,
        slots: {
          customRender: "action",
        },
      },
    ]);

    const columnsDirecciones = ref([
      {
        title: "id",
        dataIndex: "intId",
        key: "intId",
        width: 3,
      },
      {
        title: "Direccion",
        dataIndex: "strDireccion",
        key: "strDireccion",
        width: 30,
        scopedSlots: { customRender: "Direccion" },
      },
      {
        title: "Telefono",
        dataIndex: "strTelefono",
        key: "strTelefono",
        width: 10,
      },
    ]);

    const editUser = ref(false);
    const editingKey = ref("");
    const ShowTable = ref({
      Sort: true,
      Search: false,
      Operation: false,
      Menu: true,
      Users: false,
      TablaUser: false,
      CRUDUsers: false,
    });
    onMounted(() => {
      // getUsers();
      // LoginUser(); //no va en este va en login
    });

 

    const getUsers = async () => {
      cleanData();
      ShowTable.value.Users = true;
      ShowTable.value.CRUDUsers = false;
      let Parameter = {
        idUser: 0,
        Transaction: "FrmPersonasNaturales",
        ExecuteQuery: "ListarPersonasNaturales",
      };

      tblusers.value = await GetDataServices("Portafolio", Parameter, false);

      return;
    };

    const saveUser = async () => {
      let Parameter = {
        idUser: 0,
        Transaction: "FrmPersonasNaturales",
        ExecuteQuery: editUser.value
          ? "ActualizarPersonasNaturales"
          : "AdicionarPersonasNaturales",
        Encabezado: {
          //Datos Para Auditoria
          idUser: 0,
          CodigoFormulario: 0,
          CoditoTransaccion: 0,
          SucursalAgencia: 0,
          DateClient: Date,
        },
      };
      Parameter.Detalle = {
        id: frmUser.value.lngNumId,
        Documento: frmUser.value.strNit,
        Name: frmUser.value.Name,
        LastName: frmUser.value.LastName,
        Salary: frmUser.value.Salary,
        Email: frmUser.value.Email,
      };

      Parameter.Direcciones = [
        {
          id: 0,
          lngNumIdTerc: frmUser.value.lngNumId,
          Direccion: "Calle 18 B Sur 36-88 con el nuevo metod insert",
          Pais: "Colombia",
          Provincia: "Antioquia",
          Ciudad: "Medellin",
          Barrio: "Poblado",
          Latitud: 0,
          Longitud: 0,
          TipoDireccion: 1,
          Principal: 1,
        },
      ];

      const data = await GetDataServices("Portafolio", Parameter, true);

      Swal.fire({
        icon: "success",
        title: "Transacción",
        text: "Transaccion Exitosa",
      });

      getUsers();
    };

    const deleteUser = async (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log("borrar", {
            idUser: 0,
            idTercero: id,
            Transaction: "FrmPersonasNaturales",
            ExecuteQuery: "DeleteUser",
          });
          const { data } = await GetDataServices(
            "Portafolio",
            {
              idUser: 0,
              idTercero: id,
              Transaction: "FrmPersonasNaturales",
              ExecuteQuery: "DeleteUser",
            },
            false
          );

          getUsers();
          Swal.fire({
            icon: "success",
            title: "Transacción Eliminar Registro",
            text: "Registro Eliminado Con Exito",
          });
        }
      });
    };

    const cleanData = () => {
      frmUser.value = {
        idTercero: 0,
        Name: "",
        LastName: "",
        Email: "",
        Salary: 0,
      };
      tblDirecciones.value = {
        id: 0,
        idTercero: 0,
        Direccion: "",
        Pais: "",
        Depto: "",
        Ciudad: "",
        Region: "",
        Longitud: "",
        Latitud: "",
      };
      editUser.value = false;
    };

    const getUserData = async (plngNumId) => {
      cleanData();

      let Parameter = {
        idUser: 0,
        idTercero: plngNumId, // user.lngNumId,
        Transaction: "FrmPersonasNaturales",
        ExecuteQuery: "ObtenerInformacionCliente",
      };
      // console.log("a leer pora que cliente ", Parameter);

      editUser.value = true;

      let MData = await GetDataServices("Portafolio", Parameter, true);

      if (MData.DatosBasicos.length == 0) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "Sin Informacion",
        });
      }
      frmUser.value = MData.DatosBasicos[0];
      if (MData.Direcciones.length > 0)
        tblDirecciones.value = MData.Direcciones;
      return;
    };
    // const handleChangeAplcation = (value) => {
    //   store.dispatch("ActApp",value.value)
    //   // store.state.idApp = value.value;
    //    console.log("handleChangeAplcation ", value.value,' SelectedAplication ',SelectedAplication.value,' state ',store.getters.getApp);
    // }
    const handleChangeTableSelect = (value) => {
      console.log("handleChangeTableSelect ", value);
      ShowTable.value.Sort = false;
      ShowTable.value.Search = false;
      ShowTable.value.Operation = false;
      ShowTable.value.Menu = true;
      ShowTable.value.Users = false;
      ShowTable.value.TablaUser = false;
      ShowTable.value.CRUDUsers = false;
      switch (value.value * 1) {
        case 10:
          ShowTable.value.Sort = true;
          break;
        case 20:
          ShowTable.value.Search = true;
          break;
        case 30:
          ShowTable.value.Operation = true;
          break;
        case 40:
          ShowTable.value.Menu = true;
          break;
        case 50:
          ShowTable.value.Users = true;
          getUsers();
          break;
        case 60:
          ShowTable.value.TablaUser = true;
          break;
        default:
          console.log("entre por default ", ShowTable.value.Sort);
          break;
      }
    };
    const actions = () => {
      // editUser.value ? updateUser() : saveUser();
      editUser.value ? saveUser(editUser.value) : saveUser(editUser.value);
    };
    const state = reactive({
      searchText: "",
      searchedColumn: "",
    });
    const searchInput = ref(null);
    const rowSelectionUser = (record) => {
      getUserData(record.lngNumId);
      ShowTable.value.Users = false;
      ShowTable.value.CRUDUsers = true;
    };
    const onDelete = (key) => {
      console.log("ondelete ");
      tblusers.value = tblusers.value.filter((item) => item.key !== key);
    };

    const cancel = (key) => {
      delete editableData[key];
    };
    const onChange = (pagination, filters, sorter) => {
      console.log("params", pagination, filters, sorter);
    };
    const rowClassUser = (PRecord, PIndex) => {
      if (Object.keys(PRecord).length == 0) return;
      //(record, index) => (index % 2 === 1 ? 'table-striped' : null)
      return PIndex % 2 === 1 ? "table-striped" : "table-bule";
    };

    return {
      //object y Variables A Exportar
      optionAplications,
      // SelectedAplication,
      DataUser,
      onSubmit,
      getUsers,
      loading,
      pagination,
      handleSearch,
      handleReset,
      searchText: "",
      searchInput,
      searchedColumn: "",
      GetDataServices,
      store,
      frmUser,
      tblDirecciones,
      columnsDirecciones,
      columnsUsers,
      tblusers,
      cancel,
      onDelete,
      rowSelectionUser,

      rowClassUser,
      onChange,
      actions,
      deleteUser,
      getUserData,
      editingKey,
      ShowTable,
      optionsTable,
      handleChangeTableSelect,
      // handleChangeAplcation,
      valueTablaSelect: ref({
        value: "10",
      }),
    };
  },
});
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.iconfontyyy {
  font-family: "iconfontyyy" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.ant-table-striped :deep(.table-striped) td {
  background-color: red;
}
.ant-table-striped,
table-bule :deep(.table-striped) td {
  background-color: blue;
}
</style>
