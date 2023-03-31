<template>
  <div>
    <el-form :model="searchForm" label-width="120px" inline>
      <el-form-item label="">
        <el-input v-model="searchForm.keyWord" />
      </el-form-item>
      <el-form-item label="">
        <el-button type="" @click="initData(searchForm)">搜索</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-button type="" @click="handleClose">添加</el-button>
      </el-form-item>
      
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="createTime" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="desc" label="Address" />
      <el-table-column fixed="right" label="Operations" width="250">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleClick(scope.row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="deleteClick(scope.row)">删除</el-button>
          <el-button link type="primary" size="small" @click="seeClick(scope.row)">查看详情</el-button>
          <el-button link type="primary" size="small" @click="addTag(scope.row)">添加Tag</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
      <el-form :model="form" label-width="120px">
        <el-form-item label="id" v-if="dialogForm.id">
          <el-input v-model="dialogForm.id" />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="dialogForm.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="dialogForm.desc" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="warning" @click="saveDate">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-pagination v-model:current-page="searchForm.page" :page-size="searchForm.pageSize" :page-sizes="[10, 20, 30, 40]"
      :small="false" :disabled="false" :background="true" layout="sizes, prev, pager, next" :total="searchForm.total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
  <el-dialog v-model="tagDialog" title="选择tips" width="30%">
    <el-tag @click="pushTag('Tag 1','')">Tag 1</el-tag>
    <el-tag class="ml-2" type="success" @click="pushTag('Tag 2','success')">Tag 2</el-tag>
    <el-tag class="ml-2" type="info" @click="pushTag('Tag 3','info')">Tag 3</el-tag>
    <el-tag class="ml-2" type="warning" @click="pushTag('Tag 4','warning')">Tag 4</el-tag>
    <el-tag class="ml-2" type="danger" @click="pushTag('Tag 5','danger')">Tag 5</el-tag>
    <div>
      <span>当前选择: <span v-for="(item,index) in tagList">
        <el-tag class="ml-2" :type="item.color">{{ item.name }}</el-tag>
      </span> </span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="tagDialog = false">取消</el-button>
        <el-button type="primary" @click="saveTag">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
type searchFormType = {
  keyWord: string,
  total: number,
  page: number,
  pageSize: number
}
type formType = {
  id?: number|string,
  name: string,
  desc: string,
}
const tagDialog = ref<boolean>(false);
const dialogVisible = ref<boolean>(false);
const searchForm = ref<searchFormType>({
  keyWord: "",
  total: 10,
  page: 1,
  pageSize: 10
})
const tagList = ref<Array<{name:string,color:string}>>([]);
const form = ref<formType>({
  name: "",
  desc: ''
})
const dialogForm = ref({
  id: '',
  name: '',
  desc: ''
})
const tableData = ref<object[]>([])
const rowDetail = ref<any>();

const handleClose = () => {
  searchForm.value.page = 1;
  dialogVisible.value = true;
  dialogForm.value = {
    id: '',
    name: '',
    desc: ''
  };
}

const initData = (form: object) => {
  axios.get('/v1/table', { params: form }).then((res) => {
    console.log(res)
    tableData.value = res.data.data.data;
    searchForm.value.total = res.data.data.total
  })
}
initData(searchForm.value);

const saveDate = () => {
  if (dialogForm.value.id) {
    axios.patch(`/v1/table/${dialogForm.value.id}`, { ...dialogForm.value }).then((res) => {
      console.log(res)
      ElMessage(res.data.message)
      dialogVisible.value = false;
      searchForm.value.page = 1;
      initData(searchForm.value);
    })
  } else {
    axios.post('/v1/table', { ...dialogForm.value }).then((res) => {
      console.log(res)
      ElMessage(res.data.message)
      dialogVisible.value = false;
      searchForm.value.page = 1;
      initData(searchForm.value);
    })
  }

}

const handleClick = (row: { id: string, name: string, desc: string }) => {
  dialogVisible.value = true;
  dialogForm.value = row;
}

const deleteClick = (row: { id: number }) => {
  console.log(row)
  axios.delete(`/v1/table/${row.id}`, {}).then((res) => {
    console.log(res)
    ElMessage(res.data.message)
    initData(searchForm.value);
  })
}

const seeClick = (row: { id: number }) => {
  axios.get(`/v1/table/detail/${row.id}`, {}).then((res) => {
    console.log(res)
    dialogForm.value = res.data.data
    dialogVisible.value = true;
  })
}
const handleSizeChange = (e: any) => {
  console.log(e)
  searchForm.value.pageSize = e;
  searchForm.value.page = 1;
  initData(searchForm.value)
}
const handleCurrentChange = (e: any) => {
  console.log(e)
  searchForm.value.page = e;
  initData(searchForm.value)
}

const addTag = (row: formType) => {
  tagDialog.value = true;
  rowDetail.value = row;
  tagList.value = [];
}


const pushTag = (name:string,color:string)=>{
  if(!tagList.value.some((item,index)=>{return item.name===name})){
    tagList.value.push({name,color});
  }
}

const saveTag = ()=>{
console.log(rowDetail.value);
axios.post(`/v1/table/tag/add`, {id:rowDetail.value.id,tags:tagList.value}).then((res) => {
    console.log(res);
    searchForm.value.page = 1;
    initData(searchForm.value);
  })
}
</script>

<style></style>