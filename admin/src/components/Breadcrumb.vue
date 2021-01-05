<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ parentCat }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ cat }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    parentCat: { type: String, default: '' },
    cat: { type: String, default: '' }
  }
}
</script>
