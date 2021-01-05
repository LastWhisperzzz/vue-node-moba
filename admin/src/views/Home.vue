<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div class="logo">
        <img src="../assets/img/logo.png" alt="英雄联盟" />
      </div>
      <!-- 头部右侧 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
            class="user-avatar"
          />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <a href="javascript:;">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </a>
          <a target="_blank" href="https://github.com/LastWhisperzzz">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>

    <!-- 侧边栏菜单 -->
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          :default-openeds="['1']"
          unique-opened
          :default-active="$route.path"
          background-color="#304156"
          text-color="#BFCBD9"
          active-text-color="#409EFF"
        >
          <!-- 分类管理一级菜单 -->
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-s-fold"></i>分类管理</template
            >
            <!-- 分类管理二级菜单 -->
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/category">分类列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 物品管理一级菜单 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>物品管理
            </template>
            <!-- 物品管理二级菜单 -->
            <el-menu-item-group>
              <template slot="title">物品</template>
              <el-menu-item index="/item">物品列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 英雄管理一级菜单 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-help"></i>英雄管理
            </template>
            <!--英雄管理二级菜单 -->
            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item
                :index="$route.path"
                v-if="
                  $route.path === '/hero/create' ||
                    $route.path.indexOf('/hero/edit') !== -1
                "
                >{{ AddOrEdit }}</el-menu-item
              >
              <el-menu-item index="/hero/list">英雄列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 文章管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-document"></i>文章管理
            </template>
            <!--文章管理二级菜单 -->
            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item
                :index="$route.path"
                v-if="
                  $route.path === '/article/create' ||
                    $route.path.indexOf('/article/edit') !== -1
                "
                >{{ AddOrEdit }}</el-menu-item
              >
              <el-menu-item index="/article/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 广告位管理 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-data-line"></i>广告位管理
            </template>
            <!--广告位二级菜单 -->
            <el-menu-item-group>
              <template slot="title">广告位</template>
              <el-menu-item index="/ad/list">广告位列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <!-- 用户管理 -->
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-user"></i>用户管理
            </template>
            <!--用户管理二级菜单 -->
            <el-menu-item-group>
              <template slot="title">用户</template>
              <el-menu-item index="/admin_user/list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    logout() {
      this.$confirm('是否退出当前账户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        sessionStorage.clear()
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  height: 100vh;
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(48, 65, 86);
    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 16px;
        }
      }
    }
  }
  .el-aside {
    background-color: #304156;
    .el-menu {
      border-right: none;
    }
  }
}
</style>
