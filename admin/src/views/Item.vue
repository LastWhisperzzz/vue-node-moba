<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb parentCat="物品管理" cat="物品列表" />
    <!-- 卡片视图区域 -->
    <el-card>
      <el-button type="primary" icon="el-icon-plus" @click="showAddDialog"
        >添加装备</el-button
      >
      <el-table :data="itemList" border stripe>
        <!-- 装备描述 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div>{{ scope.row.desc }}</div>
            <div class="item-detail">{{ scope.row.detail }}</div>
          </template>
        </el-table-column>
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 装备名称 -->
        <el-table-column label="装备名称" prop="name"></el-table-column>
        <!-- 图标 -->
        <el-table-column label="图标">
          <template slot-scope="scope">
            <img class="item-icon" :src="scope.row.icon" />
          </template>
        </el-table-column>
        <!-- 品级 -->
        <el-table-column label="品级" prop="grade">
          <template slot-scope="scope">
            <el-tag size="mini" type="info" v-if="scope.row.grade === 1"
              >普通</el-tag
            >
            <el-tag size="mini" type="success" v-else-if="scope.row.grade === 2"
              >史诗</el-tag
            >
            <el-tag size="mini" v-else-if="scope.row.grade === 3">传说</el-tag>
            <el-tag size="mini" type="warning" v-else-if="scope.row.grade === 4"
              >神话</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageParams.pagenum"
        :page-sizes="[5, 8, 10, 15]"
        :page-size="pageParams.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 新增编辑对话框 -->
    <el-dialog
      :title="this.formData._id ? '编辑物品' : '添加物品'"
      :visible.sync="dialogVisible"
      width="40%"
      @close="dialogClose"
    >
      <el-form label-width="70px">
        <!-- 物品名称 -->
        <el-form-item label="物品名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <!-- 物品图标 -->
        <el-form-item label="图标">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="res => $set(formData, 'icon', res.url)"
          >
            <img v-if="formData.icon" :src="formData.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="formData.price"></el-input>
        </el-form-item>
        <!-- 品级 -->
        <el-form-item label="品级">
          <el-rate
            show-text
            :texts="texts"
            :max="4"
            v-model="formData.grade"
          ></el-rate>
        </el-form-item>
        <!-- 详情 -->
        <el-form-item label="详情">
          <el-input type="textarea" v-model="formData.desc"></el-input>
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
  name: 'ItemList',
  components: {
    Breadcrumb
  },
  data() {
    return {
      // 物品列表数据
      itemList: [],
      dialogVisible: false,
      // 添加编辑表单数据
      formData: {},
      id: '',
      // rate自定义提示信息
      texts: ['普通', '史诗', '传说', '神话'],
      // 分页数据
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  created() {
    this.getItemList()
  },
  methods: {
    // 获取装备列表
    async getItemList() {
      const res = await this.axios.get('rest/items', {
        params: this.pageParams
      })
      this.total = res.data.total
      this.itemList = res.data.data
    },
    showAddDialog() {
      this.dialogVisible = true
    },
    async showEditDialog(row) {
      this.id = row._id
      const res = await this.axios.get(`rest/items/${this.id}`)
      this.formData = res.data
      this.dialogVisible = true
    },
    dialogClose() {
      this.formData = {}
    },
    // 新增、编辑保存
    async save() {
      if (!this.formData._id) {
        await this.axios.post('rest/items', this.formData)
        this.$message.success('添加成功')
      } else {
        await this.axios.put(`rest/items/${this.id}`, this.formData)
        this.$message.success('保存成功')
      }
      this.getItemList()
      this.dialogVisible = false
    },
    // 删除
    async remove(row) {
      this.$confirm(`是否确定要删除物品 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete(`rest/items/${row._id}`)
        this.$message.success('删除成功!')
        this.getItemList()
      })
    },
    // 监听分页变化
    handleSizeChange(pagesize) {
      this.pageParams.pagesize = pagesize
      this.getItemList()
    },
    handleCurrentChange(pagenum) {
      this.pageParams.pagenum = pagenum
      this.getItemList()
    }
  }
}
</script>

<style lang="scss">
.item-icon {
  width: 45px;
  height: 45px;
}
.item-detail {
  padding-top: 10px;
}

// upload
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  min-width: 5rem;
  height: 5rem;
  display: block;
}
</style>
