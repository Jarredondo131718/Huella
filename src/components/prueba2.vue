<template>
  <a-table :columns="columns" :data-source="data">
    <template #customTitle>
      <span>
        <smile-outlined />
        Name
      </span>
    </template>

    <template #action="{ record }">
       <a-space >
        <EditOutlined class="vsGreen" @click="EditRecordReferencia(record)"/>
      <DeleteOutlined class="vsRed"
      @click="DeleteRecordReferencia(record)"/>
        <!-- <a  @click="EditRecordReferencia(record)">Invite 一 {{ record.name }}</a> -->

      </a-space>
      <span>
    
      </span>      
    </template>
  </a-table>
</template>

<script>
import { SmileOutlined, DeleteOutlined,EditOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: {
      title: 'customTitle',
      customRender: 'name',
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    slots: {
      customRender: 'tags',
    },
  },
  {
    title: 'Action',
    key: 'action',
    slots: {
      customRender: 'action',
    },
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default defineComponent({
  setup() {
    const EditRecordReferencia = (e) =>{
      console.log(" EditRecordReferenciae ",e)
      };
    const DeleteRecordReferencia = (e) =>{
      console.log("DeleteRecordReferencia e ",e)
    };
   
    return {
      data,
      EditRecordReferencia,
      DeleteRecordReferencia,
      columns,
    };
  },

  components: {
    SmileOutlined,
    DeleteOutlined,
    EditOutlined
  },
});
</script>
<style scoped>
.vsRed{
  color: white;
  background-color: rgb(245, 8, 8);
}
.vsGreen{
  background-color: #c3fa8d;
  color: white;
}
</style>