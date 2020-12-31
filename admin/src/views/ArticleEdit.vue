<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <el-form label-width="120px">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input type="primary" v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          v-model="model.body"
          useCustomImageHandler
          @image-added="handleImageAdded"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'ArticleEdit',
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      categories: []
    }
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  },
  methods: {
    // 富文本编辑器图片上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await this.axios.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    },
    async save() {
      let res
      if (this.id) {
        res = await this.axios.put(`rest/articles/${this.id}`, this.model)
      } else {
        res = await this.axios.post('rest/articles', this.model)
      }

      console.log(res)
      // res判断
      this.$router.push('/articles/list')
      this.$message({ type: 'success', message: '保存成功' })
    },
    async fetch() {
      const res = await this.axios.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    async fetchCategories() {
      const res = await this.axios.get('rest/categories')
      this.categories = res.data
    }
  }
}
</script>
