<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}物品</h1>
    <el-form label-width="120px">
      <el-form-item label="名称">
        <el-input type="primary" v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="axios.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CategoryEdit',
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: '',
        icon: ''
      }
    }
  },
  created() {
    this.id && this.fetch()
  },
  methods: {
    afterUpload(res) {
      console.log(res)
      this.model.icon = res.url
    },
    async save() {
      let res
      if (this.id) {
        res = await this.axios.put(`rest/items/${this.id}`, this.model)
      } else {
        res = await this.axios.post('rest/items', this.model)
      }

      console.log(res)
      // res判断
      this.$router.push('rest/items/list')
      this.$message({ type: 'success', message: '保存成功' })
    },
    async fetch() {
      const res = await this.axios.get(`rest/items/${this.id}`)
      this.model = res.data
    }
  }
}
</script>

<style>
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
