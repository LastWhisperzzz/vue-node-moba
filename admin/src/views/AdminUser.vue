<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb parentCat="用户管理" cat="用户列表" />
    <!-- 卡片视图区域 -->
    <el-card>
      <el-button type="primary" icon="el-icon-plus" @click="showAddDialog"
        >添加用户</el-button
      >
      <el-table :data="userList" border stripe>
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 用户名 -->
        <el-table-column label="用户名" prop="username"></el-table-column>
        <!-- 权限 -->
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <!-- <el-tag size="mini" v-if="scope.row.level === 1">超级管理员</el-tag>
            <el-tag size="mini" type="success" v-else-if="scope.row.level === 2"
              >测试权限</el-tag
            > -->
            <span v-if="scope.row.level === 1">超级管理员</span>
            <span v-else-if="scope.row.level === 2">测试权限</span>
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
              @change="userStateChanged()"
              disabled
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="remove(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增编辑对话框 -->
    <el-dialog
      :title="this.formData._id ? '编辑用户' : '添加用户'"
      :visible.sync="dialogVisible"
      width="40%"
      @closed="dialogClose"
    >
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item v-if="!this.formData._id" label="权限">
          <el-select v-model="formData.level" placeholder="请选择">
            <el-option label="超级管理员" value="1"> </el-option>
            <el-option label="测试权限" value="2"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'AdminUserList',
  components: { Breadcrumb },
  data() {
    return {
      // 用户数据列表
      userList: [],
      formData: {},
      dialogVisible: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const res = await this.axios.get('rest/admin_users')
      this.userList = res.data
    },
    showAddDialog() {
      this.dialogVisible = true
    },
    async showEditDialog(row) {
      this.id = row._id
      const res = await this.axios.get(`rest/admin_users/${this.id}`)
      this.formData = res.data
      this.dialogVisible = true
    },
    dialogClose() {
      this.formData = {}
    },
    // 新增、编辑保存
    async save() {
      if (!this.formData._id) {
        await this.axios.post('rest/admin_users', this.formData)
        this.$message.success('添加成功')
      } else {
        await this.axios.put(`rest/admin_users/${this.id}`, this.formData)
        this.$message.success('保存成功')
      }
      this.getUserList()
      this.dialogVisible = false
    },
    // 删除
    async remove(row) {
      this.$confirm(`是否确定要删除管理员 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/admin_users/${row._id}`)
        this.$message.success('删除成功!')
        this.getUserList()
      })
    },
    async userStateChanged() {
      this.$message.success('更新用户状态成功')
    }
  }
}
</script>
