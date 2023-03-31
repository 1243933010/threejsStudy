<template>
  <div class="login-back">
    <el-form :model="searchForm" label-width="120px" inline class="flex flex-col">
      <el-form-item label="账号">
        <el-input v-model="searchForm.username" />
      </el-form-item>

      <el-form-item label="密码">
        <el-input v-model="searchForm.password" />
      </el-form-item>
      <el-form-item style="width:100%;">
        <div class="flex flex-row items-center justify-center w-full text-center">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="regision">注册</el-button>
        </div>
      </el-form-item>
      <!-- <el-form-item >
          <el-button type="primary" @click="updateImage">更新用户头像</el-button>
        </el-form-item> -->
    </el-form>

    <!-- <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    action="v1/upload/album"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :limit="3"
    :on-exceed="handleExceed"
  >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload> -->
  </div>
</template>
  
  
<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { UploadProps, UploadUserFile } from 'element-plus'
import {useRouter} from 'vue-router'
import axios from 'axios';

const router = useRouter();
const searchForm = ref({
  username: '',
  password: ''
})


const login = async () => {
  const result = await axios.post('v1/user/login', searchForm.value).then(async (res) => {
    console.log(res)
    if (res.data.code !== 0) {
      ElMessage.error(res.data.message)
      return
    }
    localStorage.setItem('token', res.data.data.token);
    await getUserInfo();
  })
}

const getUserInfo = async () => {
  let token = localStorage.getItem('token');
  let config = {
    headers: { "authorization": `Bearer ${token}` }
  }

  const result = await axios.post('v1/user/userInfo', searchForm.value, config).then((res) => {
    console.log(res)
    if (res.data.code !== 0) {
      ElMessage.error(res.data.message)
      return
    }
    localStorage.setItem('userInfo', JSON.stringify(res.data.data));
    router.push({name:'invitation'})
  })
}

const updateImage = async () => {
  let config = {
    headers: { "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inl1ZSIsImlhdCI6MTY3OTUzMzg4NiwiZXhwIjoxNjc5NTc3MDg2fQ.LPeyOlbWO4NlYLBh1cCsi_LXb47YAZGdK_znRLXBCDc" }
  }

  let data = {
    ...searchForm.value,
    labelList: [{ label: '111' }]
  }
  const result = await axios.post('v1/user/updateUserInfo', data, config).then((res) => {
    console.log(res);
  })
}


const regision = async () => {
  const result = await axios.post('v1/user/create', searchForm.value).then((res) => {
    console.log(res)
  })
}

const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}
</script>
  
<style >
.login-back {
  width: 100%;
  height: 100%;
  background-color: blanchedalmond;
}
</style>