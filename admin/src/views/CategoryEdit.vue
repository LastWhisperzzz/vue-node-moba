<template>
  <div>
    <h3>新建分类</h3>
    <el-form label-width="120px">
      <el-form-item label="上级分类"> </el-form-item>
      <el-form-item label="名称">
        <el-input type="primary" v-model="model.name"></el-input>
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
  data() {
    return {
      model: {
        name: ''
      },
      parents: []
    }
  },
  methods: {
    async save() {
      const res = await this.axios.post('categories', this.model)
      console.log(res)
      // res判断
      this.$router.push('/categories/list')
      this.$message({ type: 'success', message: '保存成功' })
    }
  }
}
</script>
