<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ id ? '编辑' : '创建' }}文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-form label-width="80px" @submit.native.prevent="save">
        <!-- 分类 -->
        <el-form-item label="所属分类">
          <el-select
            v-model="model.categories"
            placeholder="请选择所属分类"
            clearable
            multiple
          >
            <el-option
              v-for="item in cateList"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 标题 -->
        <el-form-item label="标题">
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item label="内容">
          <vue-editor
            v-model="model.content"
            useCustomImageHandler
            @image-added="handleImageAdded"
          ></vue-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'ArticleEdit',
  props: {
    id: { type: String, default: '' }
  },
  components: {
    VueEditor
  },
  data() {
    return {
      // 文章数据
      model: {},
      // 分类数据
      cateList: []
    }
  },
  created() {
    this.getCateList()
    this.id && this.getArticle()
  },
  methods: {
    // 获取需要编辑的文章
    async getArticle() {
      const res = await this.axios.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    // 获取分类列表
    async getCateList() {
      const res = await this.axios.get('rest/categories')
      this.categories = res.data
    },
    // 富文本编辑器图片上传
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await this.axios.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    },
    // 保存
    async save() {
      if (this.id) {
        await this.axios.put(`rest/articles/${this.id}`, this.model)
        this.$message.success('保存成功')
      } else {
        await this.axios.post('rest/articles', this.model)
        this.$message.success('添加成功')
      }
      this.$router.push('/articles/list')
    }
  }
}
</script>
