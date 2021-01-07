<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb parentCat="广告位管理" cat="广告位列表" />
    <!-- 卡片视图区域 -->
    <el-card>
      <el-button type="primary" icon="el-icon-plus" @click="showAddDialog"
        >添加广告位</el-button
      >
      <el-table :data="adList" border stripe>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
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

    <!-- 添加、编辑对话框 -->
    <el-dialog
      :title="this.formData._id ? '编辑广告位' : '添加广告位'"
      :visible.sync="dialogVisible"
      @closed="dialogClose"
    >
      <el-form label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>

        <el-button
          type="primary"
          icon="el-icon-plus"
          size="itemssmall"
          @click="addAds"
          >添加广告</el-button
        >
        <el-row :gutter="20" type="flex" style="flex-wrap: wrap">
          <el-col v-for="(item, i) in formData.items" :key="i" :span="12">
            <el-card>
              <!-- 序号 -->
              <el-tag class="tag">广告位{{ i + 1 }}</el-tag>
              <!-- 轮播图 -->
              <el-form-item label="图片:" label-width="70px">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'image', res.url)"
                >
                  <img class="avatar" v-if="item.image" :src="item.image" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <!-- 跳转URL -->
              <el-form-item label="跳转地址:" label-width="70px">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-button type="danger" @click="deleteAdInfo(i)">删除</el-button>
            </el-card>
          </el-col>
        </el-row>
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
  name: 'AdList',
  components: { Breadcrumb },
  data() {
    return {
      // 广告位列表数据
      adList: [],
      formData: { items: [] },
      id: '',
      dialogVisible: false
    }
  },
  created() {
    this.getAdList()
  },
  methods: {
    async getAdList() {
      const res = await this.axios.get('rest/ads')
      console.log(res.data)
      this.adList = res.data
    },
    showAddDialog() {
      this.dialogVisible = true
    },
    async showEditDialog(row) {
      this.id = row._id
      const res = await this.axios.get(`rest/ads/${this.id}`)
      this.formData = res.data
      this.dialogVisible = true
    },
    dialogClose() {
      this.formData = { items: [] }
    },
    // 保存
    async save() {
      if (!this.formData._id) {
        await this.axios.post('rest/ads', this.formData)
        this.$message.success('添加成功')
      } else {
        await this.axios.put(`rest/ads/${this.id}`, this.formData)
        this.$message.success('保存成功')
      }
      this.getAdList()
      this.dialogVisible = false
    },
    // 删除
    async remove(row) {
      this.$confirm(`是否确定要删除"${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete(`rest/ads/${row._id}`)
        this.$message.success('删除成功!')
        this.getAdList()
      })
    },
    // 对话框内添加广告位
    addAds() {
      this.formData.items.push({})
    },
    // 对话框内删除广告位
    deleteAdInfo(i) {
      this.formData.items.splice(i, 1)
    }
  }
}
</script>

<style lang="scss">
.ad-img {
  width: 280px;
  vertical-align: middle;
}
.tag {
  margin-bottom: 18px;
}
</style>
