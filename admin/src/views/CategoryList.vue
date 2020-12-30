<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="cateList" stripe>
      <el-table-column prop="_id" label="ID" width="230"> </el-table-column>
      <el-table-column prop="parent.name" label="上级分类"> </el-table-column>
      <el-table-column prop="name" label="分类名称"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  data() {
    return {
      cateList: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const res = await this.axios.get('rest/categories')
      console.log(res.data)
      this.cateList = res.data
    },
    async remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/categories/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getCateList()
      })
    }
  }
}
</script>

<style scoped></style>
