<template>
  <el-container class="home-container">
    <!-- 侧边栏菜单 -->
    <el-aside :width="isCollapse ? '' : ''">
      <el-menu
        router
        unique-opened
        :default-active="$route.path"
        background-color="#304156"
        text-color="#BFCBD9"
        active-text-color="#409EFF"
        :collapse="isCollapse"
        class="el-menu-vertical"
      >
        <el-menu-item index="/">
          <i class="el-icon-odometer"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <!-- 分类管理一级菜单 -->
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-menu"></i>
            <span slot="title">分类管理</span></template
          >
          <!-- 分类管理二级菜单 -->
          <el-menu-item-group>
            <span slot="title">分类</span>
            <el-menu-item index="/categories">分类列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 物品管理一级菜单 -->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-takeaway-box"></i>
            <span slot="title">物品管理</span>
          </template>
          <!-- 物品管理二级菜单 -->
          <el-menu-item-group>
            <span slot="title">物品</span>
            <el-menu-item index="/items">物品列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 英雄管理一级菜单 -->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-help"></i>
            <span slot="title">英雄管理</span>
          </template>
          <!--英雄管理二级菜单 -->
          <el-menu-item-group>
            <span slot="title">英雄</span>
            <el-menu-item
              :index="$route.path"
              v-if="
                $route.path === '/heroes/create' ||
                  $route.path.indexOf('/heroes/edit') !== -1
              "
              >{{ AddOrEdit }}</el-menu-item
            >
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 文章管理 -->
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">文章管理</span>
          </template>
          <!--文章管理二级菜单 -->
          <el-menu-item-group>
            <span slot="title">文章</span>
            <el-menu-item
              :index="$route.path"
              v-if="
                $route.path === '/articles/create' ||
                  $route.path.indexOf('/articles/edit') !== -1
              "
              >{{ AddOrEdit }}</el-menu-item
            >
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 广告位管理 -->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-data-line"></i>
            <span slot="title">广告位管理</span>
          </template>
          <!--广告位二级菜单 -->
          <el-menu-item-group>
            <span slot="title">广告位</span>
            <el-menu-item index="/ads">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 用户管理 -->
        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </template>
          <!--用户管理二级菜单 -->
          <el-menu-item-group>
            <span slot="title">用户</span>
            <el-menu-item index="/admin_users">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 头部 -->
      <el-header>
        <!-- 折叠展开按钮 -->
        <div>
          <i
            v-show="!isCollapse"
            class="el-icon-s-unfold"
            @click="isCollapse = true"
            style="font-size:18px"
          ></i>
          <i
            v-show="isCollapse"
            class="el-icon-s-fold"
            @click="isCollapse = false"
            style="font-size:18px"
          ></i>
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
              <el-dropdown-item>前台页面</el-dropdown-item>
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
      tableData: [],
      isCollapse: false
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
  },
  computed: {
    AddOrEdit() {
      if (this.$route.path.indexOf('/heroes') !== -1) {
        if (this.$route.path === '/heroes/create') {
          return '添加英雄'
        } else if (this.$route.path.indexOf('/heroes/edit') !== -1) {
          return '编辑英雄'
        }
      } else {
        if (this.$route.path === '/articles/create') {
          return '添加文章'
        } else if (this.$route.path.indexOf('/articles/edit') !== -1) {
          return '编辑文章'
        }
      }
      return ''
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
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
  .el-main {
    background-color: #eaedf1;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
