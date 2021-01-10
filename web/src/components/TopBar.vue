<template>
  <div>
    <div class="top-bar clearfix">
      <div class="logo">
        <a href="javascript:;">
          <img src="../assets/images/logo.png" width="100%" />
        </a>
      </div>
      <div class="top-btn">
        <a href="javascirpt:;">敬请关注</a>
      </div>
      <div
        id="btn-nav-slide"
        class="top-nav-btn"
        :class="{ G_close: active }"
        @click="active = !active"
      >
        <i class="draw"></i>
      </div>
    </div>
    <!-- 弹出层 -->
    <nav id="commonNav" class="common_nav" :class="{ G_open: active }">
      <div class="cover_content">
        <ul>
          <li>
            <a href="javascript:;">敬请关注</a>
          </li>
          <li>
            <a href="javascript:;">新闻资讯</a>
          </li>
          <li>
            <a href="javascript:;">游戏特色</a>
          </li>
          <li>
            <a href="javascript:;" target="_blank">问题反馈</a>
          </li>
          <li>
            <a href="javascript:;">FAQ</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {
      active: false
    }
  }
}
</script>

<style lang="scss" scoped>
.top-bar {
  width: 100%;
  height: 1.96rem;
  background-color: #202629;
  position: sticky;
  top: 0;
  z-index: 99;
  .logo {
    float: left;
    width: 3.18rem;
    height: 1.0108rem;
    margin: 0.26rem 0 0 0.56rem;
  }
  .top-btn {
    float: left;
    width: 3.04rem;
    height: 1.26rem;
    line-height: 1.06rem;
    text-align: center;
    font-size: 0.48rem;
    color: #fff;
    border: 0.12rem #ffe537 solid;
    margin: 0.3rem 0 0 6rem;
  }
  .top-nav-btn {
    width: 0.88rem;
    height: 0.88rem;
    overflow: hidden;
    position: absolute;
    right: 0.4rem;
    top: 0.64rem;
    z-index: 10001;
  }
}
.draw,
.draw:before,
.draw:after {
  width: 0.88rem;
  height: 0.04rem;
  background: #fff;
  position: absolute;
  left: 0;
  -webkit-transition: all 0.5s;
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
}

// 导航菜单按钮
.draw {
  top: 0.36rem;
  left: 0;
}
.draw:before {
  content: '';
  top: -0.16rem;
}
.draw:after {
  content: '';
  top: 0.14rem;
}
.G_close .draw {
  background: transparent;
}
.G_close .draw:before {
  top: 0;
  -webkit-transform: rotate(45deg);
  background: #bc3129;
}
.G_close .draw:after {
  top: 0;
  -webkit-transform: rotate(-45deg);
  background: #bc3129;
}

// 弹出层
.common_nav {
  width: 0;
  height: 0;
  position: fixed;
  right: 0;
  top: rem;
  z-index: 9999;
  opacity: 0;
  -webkit-transition: all 0.5s;
  -webkit-transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
}
.cover_content {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99;
  background: #1e1e1e;
}
.common_nav ul {
  width: 100%;
  overflow: hidden;
  text-align: center;
}
.common_nav li {
  height: 2.72rem;
  overflow: hidden;
  line-height: 2.72rem;
  position: relative;
  border-top: 0.04rem solid #2c2c2c;
}
.common_nav a {
  display: block;
  height: 100%;
  font-size: 0.6rem;
  color: #fff;
}
.G_open {
  width: 100%;
  height: 100%;
  top: 1.8rem;
  opacity: 1;
  -webkit-transform: scale3d(1, 1, 1);
}
</style>
