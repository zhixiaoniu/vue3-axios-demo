<template>
  <div class="table-box">
    <!-- 标题 -->
    <div class="title">
      <h2>最简单的 CURD Demo</h2>
    </div>
    <!-- query -->
    <div class="query-box">
      <el-input class="query-input" v-model="queryInput" placeholder="请输入姓名搜索" @change="handleQueryName"/>
      <div class="btn-list">
        <el-button type="primary" @click="handleAdd">增加</el-button>
        <el-button type="danger" @click="handleDelList" v-if="multipleSelection.length > 0">删除多选</el-button>
      </div>
    </div>
    <!-- table -->
    <el-table
        :data="tableData"
        style="width: 100%"
        border
        ref="multipleTableRef"
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="email" label="邮箱" width="120" />
      <el-table-column prop="phone" label="电话" width="120" />
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column prop="address" label="地址" width="300" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button link type="danger" size="small" @click="handleRowDel(scope.row)">
            删除
          </el-button>
          <el-button link type="primary" size="small" @click="handleRowEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog弹窗 -->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle === 'add' ? '新增' : '编辑'">
      <el-form :model="tableForm">
        <el-form-item label="姓名" :label-width="60">
          <el-input v-model="tableForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="60">
          <el-input v-model="tableForm.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" :label-width="60">
          <el-input v-model="tableForm.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="60">
          <el-input v-model="tableForm.state" autocomplete="off" />
        </el-form-item>
        <el-form-item label="地址" :label-width="60">
          <el-input v-model="tableForm.address" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogConfirm">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref } from "vue";
import request from './utils/request';

/* 数据  */
let queryInput = ref("")
let tableData = ref([
  {
    id:'1',
    name: 'Tom',
    state: '在职',
    phone:'13800138000',
    email:'1203@dsfa.com',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:'2',
    name: 'Tom2',
    state: '在职',
    phone:'13800138000',
    email:'1203@dsfa.com',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:'3',
    name: 'Tom3',
    state: '在职',
    phone:'13800138000',
    email:'1203@dsfa.com',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id:'4',
    name: 'Tom4',
    state: '在职',
    phone:'13800138000',
    email:'1203@dsfa.com',
    address: 'No. 189, Grove St, Los Angeles',
  },

])
let tableDataCopy = Object.assign(tableData.value)
let multipleSelection = ref([])
let dialogFormVisible = ref(false)
let tableForm = ref({
  name:'张三',
  email:'dsaf@11.com',
  phone:'13800138000',
  state:'在职',
  address:'广东省'
})
let dialogTitle = ref('add')
/* 方法 */
//api获取数据
const getTableData = async () =>{
  let res = await request.post('/index/user/userSelect', {
    'name':queryInput.value
  })
  tableData.value = res
}
getTableData()
//搜索
const handleQueryName = () =>{
  getTableData()
}
//编辑
const handleRowEdit = async (row) =>{
  dialogFormVisible.value = true
  dialogTitle.value = 'edit'
  tableForm.value = row
}
//删除多条
const handleDelList = async () =>{
  await request.post('/index/user/userDel', {
    'id':multipleSelection.value
  })
  getTableData()
}
//删除一条 {id} 解构赋值
const handleRowDel = async ({id}) => {
  await request.post('/index/user/userDel', {
    'id':id
  })
  getTableData()
}
//选中
const handleSelectionChange = (val) => {
  multipleSelection.value = []
  val.forEach(item =>{
    multipleSelection.value.push(item.id)
  })
}
//添加新增
const handleAdd = () =>{
  dialogFormVisible.value = true
  dialogTitle.value = 'add'
  tableForm.value = {}
}
//添加确认
const dialogConfirm = async () =>{
  if(dialogTitle.value === 'add'){
    //确认添加
    dialogFormVisible.value = false
    await request.post('/index/user/userAdd', tableForm.value)
    getTableData()
  }else{
    //确认编辑
    dialogFormVisible.value = false
   await request.post('/index/user/userEdit', tableForm.value)
  }
}
</script>

<style scoped>
.table-box{
  margin:200px auto;
  width: 800px;
  /*position: absolute;*/
  /*top:50%;*/
  /*left:50%;*/
  /*transform: translate(-50%,-50%);*/
}
.title{
  text-align: center;
}
.query-box{
  display: flex;
  justify-content:space-between;
  margin-bottom: 20px;
}
.query-input{
  width:200px;
}
</style>