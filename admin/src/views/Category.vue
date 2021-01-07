<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb parentCat="分类管理" cat="分类列表" />
    <!-- 卡片视图区域 -->
    <el-card>
      <el-button type="primary" icon="el-icon-plus" @click="showAddDialog"
        >添加分类</el-button
      >
      <tree-table
        show-index
        :data="cateList"
        :columns="columns"
        :expand-type="false"
        :selection-type="false"
        border
      >
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.level === 1"
            >二级</el-tag
          >
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <template slot="operate" slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showEditDialog(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="remove(scope.row)"
          ></el-button>
        </template>
      </tree-table>
    </el-card>

    <!-- 新增分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addDialogVisible"
      width="40%"
      @close="addDialogClosed"
    >
      <el-form
        ref="addFrom"
        :model="addForm"
        :rules="formRules"
        label-width="70px"
      >
        <el-form-item label="上级分类">
          <el-cascader
            :options="cateList"
            :props="cateProps"
            v-model="addForm.parent"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="分类名称" prop="name">
          <el-input maxlength="10" v-model.trim="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input maxlength="20" v-model.trim="addForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑分类对话框 -->
    <el-dialog title="编辑分类" :visible.sync="editDialogVisible" width="40%">
      <el-form label-width="70px">
        <el-form-item label="分类名称">
          <el-input v-model.trim="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input maxlength="20" v-model.trim="editForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'CategoryList',
  components: {
    Breadcrumb
  },
  data() {
    return {
      // 分类列表数据
      cateList: [],
      // 表格各列配置
      columns: [
        {
          label: '分类名称',
          prop: 'name',
          align: 'center',
          headerAlign: 'center'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order',
          align: 'center',
          headerAlign: 'center'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operate',
          align: 'center',
          headerAlign: 'center'
        }
      ],
      id: '',
      addForm: {},
      editForm: {},
      addDialogVisible: false,
      editDialogVisible: false,
      formRules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      // 级联选择器配置
      cateProps: {
        expandTrigger: 'hover',
        value: '_id',
        label: 'name',
        children: 'children',
        emitPath: false,
        checkStrictly: true
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取分类列表
    async getCateList() {
      const res = await this.axios.get('rest/categories')
      // 处理分类数据
      this.cateList = res.data
    },
    // 新增
    showAddDialog() {
      this.addDialogVisible = true
    },
    addDialogClosed() {
      this.addForm = {}
    },
    async add() {
      await this.axios.post('rest/categories', this.addForm)
      this.$message.success('添加成功')
      this.getCateList()
      this.addDialogVisible = false
    },
    // 编辑
    async showEditDialog(row) {
      this.id = row._id
      const res = await this.axios.get(`rest/categories/${row._id}`)
      this.editForm = res.data
      this.editDialogVisible = true
    },
    async edit() {
      await this.axios.put(`rest/categories/${this.id}`, this.editForm)
      this.$message.success('保存成功')
      this.getCateList()
      this.editDialogVisible = false
    },
    // 删除
    async remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete(`rest/categories/${row._id}`)
        this.$message.success('删除成功!')
        this.getCateList()
      })
    }
  }
}
</script>
