<template>
  <div>
    <!-- 顶栏 -->
    <TopBar></TopBar>
    <!-- 导航菜单 -->
    <NavBar></NavBar>
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import NavBar from '@/components/NavBar'
export default {
  name: 'Main',
  components: { TopBar, NavBar }
}
</script>
