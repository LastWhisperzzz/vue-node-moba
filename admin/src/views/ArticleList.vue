<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb parentCat="文章管理" cat="文章列表" />
    <!-- 卡片视图区域 -->
    <el-card>
      <el-button type="primary" icon="el-icon-plus" @click="add"
        >添加文章</el-button
      >
      <el-table :data="articleList" border stripe>
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 分类 -->
        <el-table-column label="所属分类" border stripe>
          <template slot-scope="scope">
            <span>{{
              scope.row.categories.map(item => item.name).join('/')
            }}</span>
          </template>
        </el-table-column>
        <!-- 标题 -->
        <el-table-column
          width="550px"
          label="标题"
          prop="title"
        ></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row)"
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
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'ArticleList',
  components: { Breadcrumb },
  data() {
    return {
      // 文章列表数据
      articleList: [],
      // 分页数据
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    // 获取文章列表
    async getArticleList() {
      const res = await this.axios.get('rest/articles', {
        params: this.pageParams
      })
      this.total = res.data.total
      this.articleList = res.data.data
    },
    // 新增
    add() {
      this.$router.push('/articles/create')
    },
    // 编辑
    edit(row) {
      this.$router.push(`/articles/edit/${row._id}`)
    },
    // 删除
    async remove(row) {
      this.$confirm(`是否确定要删除文章 "${row.title}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete(`rest/articles/${row._id}`)
        this.$message.success('删除成功!')
        this.getArticleList()
      })
    },
    // 监听分页
    handleSizeChange(pagesize) {
      this.pageParams.pagesize = pagesize
      this.getArticleList()
    },
    handleCurrentChange(pagenum) {
      this.pageParams.pagenum = pagenum
      this.getArticleList()
    }
  }
}
</script>
