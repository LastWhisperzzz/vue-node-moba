<template>
  <div class="nav-bar d-flex jc-around ai-center">
    <div class="nav-item" :class="{ active: index == 1 }" @click="index = 1">
      <router-link class="nav-link" tag="div" to="/">首页</router-link>
    </div>
    <div class="nav-item" :class="{ active: index == 2 }" @click="index = 2">
      <router-link class="nav-link" tag="div" to="/strategy"
        >攻略中心</router-link
      >
    </div>
    <div class="nav-item" :class="{ active: index == 3 }" @click="index = 3">
      <router-link class="nav-link" tag="div" to="/match">赛事中心</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      index: 1
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: #db9e3f;
  width: 100%;
  height: 1.68rem;
  font-size: 0.52rem;
  text-align: center;
  .nav-item {
    color: #fff;
    border-bottom: 0.12rem solid transparent;
    padding-bottom: 0.08rem;
    &.active {
      border-bottom-color: #fff;
    }
  }
}
</style>
