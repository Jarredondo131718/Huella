<template>
            <a>
            <el-button
              type="success"
              icon="el-icon-circle-plus-outline"
              size="mini"
              @click="handleAdd"
              title="Add New Record"
              circle
            ></el-button
          ></a>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :rowClassName="(record, index) => (index % 2 === 1 ? even : odd)"
    bordered
    @change="onChange"
  >
      <!-- :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : rowClass)" -->
    <template
      #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
    >
      <div style="padding: 8px">
        <a-input
          ref="searchInput"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          <template #icon><SearchOutlined /></template>
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
    </template>
    <template #filterIcon="filtered">
      <search-outlined :style="{ color: filtered ? '#108ee9' : undefined }" />
    </template>
    <template #customRender="{ text, column }">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
          v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
            v-if="fragment.toLowerCase() === searchText.toLowerCase()"
            class="highlight"
            :key="i"
          >
            {{ fragment }}
          </mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
      <template v-else>
        {{ text }}
      </template>
    </template>

    <template
      v-for="col in ['name', 'age', 'address']"
      #[col]="{ text, record }"
      :key="col"
    >
      <a-input
        v-if="editableData[record.key]"
        v-model:value="editableData[record.key][col]"
        style="margin: -5px 0"
      />
      <template v-else>
        {{ text }}
      </template>
    </template>
    <template #expandedRowRender="{ record }">
      <p style="margin: 0">
        {{ record.description }}
      </p>
    </template>
    <template #operation="{ record }">
      <div class="editable-row-operations">
        <span v-if="editableData[record.key] || mblnAdicionoRow">

          <a>
            <el-button
              type="success"
              icon="el-icon-s-comment"
              size="mini"
              @click="save(record.key)"
              title="Save"
              circle
            ></el-button
          ></a>

          <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
            <a>
              <a>
                <el-button
                  type="danger"
                  icon="el-icon-refresh-left"
                  size="mini"
                  @click="edit(record.key)"
                  title="Discard"
                  circle
                ></el-button> </a
            ></a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a>
            <el-button
              ref ="RecordEdit"
              type="success"
              icon="el-icon-edit"
              size="mini"
              @click="edit(record.key)"
              title="Edit"
              circle
            ></el-button>
            <a-popconfirm
              v-if="dataSource.length"
              title="Sure to delete?"
              @confirm="onDelete(record.key)"
            >
              <a>
                <el-button
                  type="danger"
                  icon="el-icon-delete-solid"
                  size="mini"
                  @confirm="onDelete(record.key)"
                  title="Discard"
                  circle
                ></el-button>
              </a>
            </a-popconfirm>
          </a>
        </span>
      </div>
    </template>
    <template #title>Titulo Tabla</template>
    <template #footer>Footer</template>
  </a-table>
</template>
<script>
import { cloneDeep } from "lodash-es";
import { defineComponent,watch, reactive, ref,computed,watchEffect  } from "vue";
import {
  SearchOutlined,
  EditOutlined,
  SaveOutlined,
  ReloadOutlined,
} from "@ant-design/icons-vue";
import { ElButton } from "element-plus";
const columns = [
  {
    key: "name",
    title: "name",
    dataIndex: "name",
    width: "25%",
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
    slots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "name",
    },
    onFilter: (value, record) =>
      record.name
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          console.log(searchInput.value);
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    key: "age",
    title: "age",
    dataIndex: "age",
    width: "8%",
    slots: {
      customRender: "age",
    },
  },
  {
    key: "money",
    title: "Cash Assets",
    className: "column-money",
    dataIndex: "money",
    width: "10%",
    slots: {
      customRender: "money",
    },    
  },
  {
    key: "address",
    title: "address",
    dataIndex: "address",
    width: "40%",
    slots: {
      customRender: "address",
    },
  },
  {
    key: "x",
    title: "operation",
    dataIndex: "operation",
    description: "me llman tango",
    slots: {
      customRender: "operation",
    },
  },
];
const data = [];

for (let i = 0; i < 6; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    money: `${i * 10000}`,
    description: `Desctiption ${i}`,
    address: `London Park no. ${i}`,
    State : true
  });
}

export default defineComponent({
  components: {
    SearchOutlined,
    EditOutlined,
    SaveOutlined,
    ReloadOutlined,
    ElButton,
  },
  setup() {
    const dataSource = ref(data);
    const editableData = reactive({});
    const RecordEdit = ref(false)
    const state = reactive({
      searchText: "",
      searchedColumn: "",
    });
    const searchInput = ref(null);
    const count = computed(() => dataSource.value.length + 1);
    const edit = (key) => {
      if(mblnAdicionoRow.value){
    
        console.log("es true mblnAdicionoRow.value ",mblnAdicionoRow.value,'new len ', dataSource.value.length,
        'llego key ',key)
      }
      editableData[key] = cloneDeep(
        dataSource.value.filter((item) => key === item.key)[0]
       
      );
               console.log("matriz en clone  editableData[key] ", editableData,' key ',key)      
    };
    const rowClass =() =>{
      return "btn-danger"
    }
    const save = (key) => {
      Object.assign(
        dataSource.value.filter((item) => key === item.key)[0],
        editableData[key]
      );
      delete editableData[key];
    };

    const onDelete = (key) => {
      console.log("ondelete ");
      dataSource.value = dataSource.value.filter((item) => item.key !== key);
    };

    const cancel = (key) => {
      delete editableData[key];
    };
    const onChange = (pagination, filters, sorter) => {
      console.log("params", pagination, filters, sorter);
    };
    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      state.searchText = selectedKeys[0];
      state.searchedColumn = dataIndex;
    };

    const handleReset = clearFilters => {
      clearFilters();
      state.searchText = '';
    };
    const mblnAdicionoRow = ref(false)
watch(mblnAdicionoRow, (newValue, oldValue) => {
  console.log('Esto es mblnAdicionoRow watch: ' , mblnAdicionoRow.value,
  ' newva ',newValue,' oldValue ',oldValue,' len data ',dataSource.value.length)
  if(newValue){
    edit(dataSource.value.length);
    mblnAdicionoRow.value = false;
  }
})
  const handleAdd = () => {
    console.log("handleAdd 1 ",dataSource.value)
      const newData = {
        key: `${count.value}`,
        name: "",
        age: 0,
        money:0,
        address: "",
        State : false
      };
          console.log("handleAdd 1 ",count.value,' newd ',newData,' RecordEdit ',(RecordEdit.value))
   
      dataSource.value.push(newData);
      mblnAdicionoRow.value=true;
      RecordEdit.click
      // edit(count.value);
      //     console.log("handleAdd 2 ",dataSource.value)
    };
watchEffect(() => {
        console.log(RecordEdit.value) // => <div>This is a root element</div>
      }, 
      {
        flush: 'post'
      })
    return {
      dataSource,
      columns,
      editingKey: "",
      editableData,
      edit,
      save,
      cancel,
      onDelete,
      onChange,
      handleSearch,
      handleReset,
      searchText: '',
      searchInput,
      searchedColumn: '',
      handleAdd,
      count,
      rowClass,
      RecordEdit,
      mblnAdicionoRow
    };
  },
});
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
th.column-money,
td.column-money {
  text-align: right !important;
  background-color: brown;
  color: blanchedalmond;
}
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}
.even {
  background: #fff;
  color: crimson;
}
.odd {
  background: #fcfcfc;
}
</style>
// dudas erros buscando search, classrow y ejecutar un boton com $ref(click)