<template>
  <a-row type="flex" justify="center">
    <a-row>
      <a-col :span="8">
        <a-card title="Login" style="width: 450px" class="clsCardLogin">
          <a-form
            name="frmLoginUser"
            ref="formRef"
            :model="frmLoginUser"
            :rules="rules"
            :layout="frmLoginUser.layout"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
          >
            <a-form-item has-feedback label="Documento" name="Documento">
              <a-input v-model:value="frmLoginUser.Documento" allow-clear>
                <template #prefix
                  ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
              </a-input>
            </a-form-item>
            <a-form-item has-feedback label="Password" name="password">
              <a-input-password
                v-model:value="frmLoginUser.password"
                type="password"
                allow-clear
              >
                <template #prefix
                  ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
                /></template>
              </a-input-password>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
              <el-button
                type="success"
                icon="el-icon-s-comment"
                size="mini"
                @click="onSubmit"
                title="Login"
                :disabled="
                  frmLoginUser.Documento.length <= 1 ||
                    frmLoginUser.password.length < 1
                "
                >Ingresar</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-s-comment"
                size="mini"
                @click="resetForm"
                title="Save"
                >Cancel</el-button
              >
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </a-row>
</template>

<script>
import {
  UserOutlined,
  InfoCircleOutlined,
  LockOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import GetDataServices from "../store/services/GetDataServices";
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    InfoCircleOutlined,
  },
  setup() {
    const store = useStore();
    const formRef = ref();
    const frmLoginUser = reactive({
      layout: "horizontal",
      Documento: "ja",
      password: "C",
      checkPass: "",
    });
    const LoginUser = async () => {
      //esto no va aca corresponde al login
      //'{"strusuario":"JA","strclave":"C", "strNitCia" : "8909048431"}
      let Parameter = {
        strUsuario: frmLoginUser.Documento,
        strClave: frmLoginUser.password,
        strNitCia: "",
        Transaction: "LoadParametros",
        ExecuteQuery: "Login",
      };

      const tblsUsuario = await GetDataServices(
        "AdmonSystem",
        Parameter,
        false
      );

      if (tblsUsuario.DatosUsuario.length == 0)
        return Swal.fire({
          icon: "error",
          title: "Ingreso Usuario",
          text: "No Existe Usuario,Verifique sus datos",
        });
      // console.log("a save tblsUsuario ", tblsUsuario.DatosUsuario[0]);
      store.dispatch("ActSaveUser", await tblsUsuario.DatosUsuario[0]);
      store.dispatch("ActSaveCia", await tblsUsuario.DatosCia[0]);
      // console.log("datos usurio ", tblsUsuario);

      store.state.optionAplications = await tblsUsuario.Aplicaciones;
      // console.log("datos optionAplications ", store.state.optionAplications);
      store.state.Oficinas = tblsUsuario.Oficinas;
      store.state.CngProductos = tblsUsuario.CngProductos;
      console.log("cargo usuario ", tblsUsuario);
      return;
    };
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          LoginUser();
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
    let checkDocumento = async (rule, value) => {
      if (!value) {
        return Promise.reject("Ingrese Documento");
      }
    };

    let validatePass = async (rule, value) => {
      if (value === "") {
        return Promise.reject("Ingrese password");
      } else {
        if (frmLoginUser.checkPass !== "") {
          formRef.value.validateFields("checkPass");
        }

        return Promise.resolve();
      }
    };

    let validatePass2 = async (rule, value) => {
      if (value === "") {
        return Promise.reject("Ingreses password");
      } else {
        return Promise.resolve();
      }
    };

    const rules = {
      password: [
        {
          required: true,
          validator: validatePass,
          trigger: "change",
        },
      ],
      checkPass: [
        {
          validator: validatePass2,
          trigger: "change",
        },
      ],
      Documento: [
        {
          validator: checkDocumento,
          required: true,
          trigger: "change",
        },
      ],
    };
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };

    const handleFinish = (values) => {
      console.log(values, frmLoginUser);
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
    };

    const resetForm = () => {
      formRef.value.resetFields();
    };

    return {
      frmLoginUser,
      formRef,
      rules,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm,
      onSubmit,
    };
  },
});
</script>
<style scoped>
.error-infos :deep(.ant-form-explain) {
  white-space: pre-line;
}
.clsCardLogin {
  background-color: #33c8ff;
  color: white;
  margin-top: 150px;
  border-radius: 4px;
}
</style>
