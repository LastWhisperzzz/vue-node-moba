<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb parentCat="英雄管理" cat="英雄列表" />
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col :span="6">
          <el-input
            maxlength="8"
            clearable
            placeholder="请输入英雄名称"
            v-model="heroQuery"
          ></el-input>
        </el-col>
        <el-col :span="3">
          <el-button
            style="margin-left:20px"
            type="primary"
            icon="el-icon-search"
            @click="searchHero"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-plus" @click="add"
            >添加英雄</el-button
          >
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="heroList" border stripe>
        <!-- 技能 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div
              class="skills"
              v-for="item in scope.row.skills"
              :key="item._id"
            >
              <div class="skill">
                <img class="skill-icon" :src="item.icon" alt="" />
              </div>
            </div>
          </template>
        </el-table-column>
        <!-- 序号 -->
        <el-table-column type="index" label="序号"></el-table-column>
        <!-- 名称 -->
        <el-table-column label="英雄名称" prop="name"></el-table-column>
        <!-- 称号 -->
        <el-table-column label="英雄称号" prop="title"></el-table-column>
        <!-- 分类 -->
        <el-table-column label="所属分类" border stripe>
          <template slot-scope="scope">
            <span>{{
              scope.row.categories.map(item => item.name).join('/')
            }}</span>
          </template>
        </el-table-column>
        <!-- 头像 -->
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img class="hero-avatar" :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              icon="el-icon-delete"
              @click="remove(scope.row)"
              >删除</el-button
            >
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
  name: 'HeroList',
  components: { Breadcrumb },
  data() {
    return {
      // 英雄列表数据
      heroList: [],
      // 分页数据
      pageParams: {
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      // 查询参数
      heroQuery: ''
    }
  },
  created() {
    this.getHeroList()
  },
  methods: {
    // 获取列表数据
    async getHeroList() {
      const res = await this.axios.get('rest/heroes', {
        params: this.pageParams
      })
      console.log(res.data)
      this.total = res.data.total
      this.heroList = res.data.data
    },
    // 新增
    add() {
      this.$router.push('/heroes/create')
    },
    // 编辑
    edit(row) {
      this.$router.push(`/heroes/edit/${row._id}`)
    },
    // 删除
    async remove(row) {
      this.$confirm(`是否确定要删除 "${row.name}"`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete(`rest/heroes/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getHeroList()
      })
    },
    // 查询
    async searchHero() {
      this.pageParams.query = this.heroQuery
      this.pageParams.pagenum = 1
      this.getHeroList(this.pageParams)
    },
    // 监听分页
    handleSizeChange(pagesize) {
      this.pageParams.pagesize = pagesize
      this.getHeroList()
    },
    handleCurrentChange(pagenum) {
      this.pageParams.pagenum = pagenum
      this.getHeroList()
    }
  }
}
</script>

<style lang="scss" scoped>
.hero-avatar {
  width: 50px;
  height: 50px;
}
.skills {
  padding: 0 50px;
  width: 485px;
  margin: 0 auto;
}
.skill {
  float: left;
  margin: 0 20px;
  font-size: 12px;
}
.skill h3 {
  font-weight: normal;
  margin: 10px 0;
}
.skill-icon {
  width: 50px;
  height: 50px;
}
</style>
