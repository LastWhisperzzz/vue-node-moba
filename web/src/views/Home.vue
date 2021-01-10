<template>
  <div>
    <!-- 首页轮播图 -->
    <swiper class="swiper" ref="swiper" v-if="adList" :options="swiperOption">
      <swiper-slide v-for="item in adList.items" :key="item._id">
        <a target="_blank" :href="item.url">
          <img class="w-100" :src="item.image" />
        </a>
      </swiper-slide>
      <div class="swiper-pagination text-right" slot="pagination"></div>
    </swiper>

    <!-- 入口导航 -->
    <div class="entry-continer bg-white">
      <div class="entry-nav d-flex flex-wrap" :class="{ close: fold }">
        <div class="entry-nav-item">
          <i class="sprite sprite-yxzl"></i>
          <div>英雄资料</div>
        </div>
        <div class="entry-nav-item">
          <i class="sprite sprite-xgzd"></i>
          <div>峡谷之巅</div>
        </div>
        <div class="entry-nav-item">
          <i class="sprite sprite-ydzy"></i>
          <div>云顶之弈</div>
        </div>
        <div class="entry-nav-item">
          <i class="sprite sprite-glzx"></i>
          <div>攻略中心</div>
        </div>
        <div class="entry-nav-item">
          <i class="sprite sprite-yz"></i>
          <div>LOL宇宙</div>
        </div>
        <div class="entry-nav-item">
          <i class="sprite sprite-zxdt"></i>
          <div>秩序殿堂</div>
        </div>
        <div class="entry-nav-item">
          <i class="sprite sprite-hdzx"></i>
          <div>活动中心</div>
        </div>
        <div class="entry-nav-item">
          <i class="sprite sprite-wxbd"></i>
          <div>微信绑定</div>
        </div>
      </div>
      <div class="entry-btn bg-light" @click="fold = !fold">
        <i class="btn-icon sprite2 sprite-arrow" :class="{ fold: fold }"></i>
        <span>{{ fold ? '展开' : '收起' }}</span>
      </div>
    </div>
    <!-- 新闻资讯 -->
    <m-card title="新闻资讯" :categories="newsList">
      <i class="sprite2 sprite-news" slot="icon-left"></i>
      <i class="sprite2 sprite-menu" slot="icon-right"></i>
      <template #items="{category}">
        <router-link
          tag="div"
          class="d-flex"
          :to="`/articles/${news._id}`"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span>[{{ news.categoryName }}]</span>
          <span>|</span>
          <span class="flex-1 text-dark-1 text-ellipsis">{{ news.title }}</span>
          <span class="text-grey-1">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-card>

    <!-- 英雄列表 -->
    <m-card title="英雄列表">
      <i class="sprite2 sprite-hero" slot="icon-left"></i>
      <i class="sprite2 sprite-menu" slot="icon-right"></i>
    </m-card>
    <!-- 精彩视频 -->
    <m-card title="精彩视频">
      <i class="sprite2 sprite-video" slot="icon-left"></i>
      <i class="sprite2 sprite-menu" slot="icon-right"></i>
    </m-card>
    <!-- <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width: 20%;"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>

    <m-card icon="menu1" title="精彩视频"></m-card>
    <m-card icon="menu1" title="图文攻略"></m-card> -->
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Home',
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      // 轮播图配置
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      // 轮播图数据
      adList: null,
      // 新闻列表数据
      newsList: [],
      // 英雄数据
      heroList: [],
      // 收起展开
      fold: true
    }
  },
  created() {
    this.getAdList()
    this.getNewsList()
    // this.fetchHeroCats()
  },
  methods: {
    // 获取轮播图数据
    async getAdList() {
      const res = await this.axios.get('/ads')
      if (!res) return
      console.log(res.data)
      this.adList = res.data[0]
    },
    async getNewsList() {
      const res = await this.axios.get('news/list')
      this.newsList = res.data
    },
    async getHeroList() {
      const res = await this.axios.get('heroes/list')
      this.heroList = res.data
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/variables';
// 轮播图
.swiper-pagination {
  padding-right: 0.4rem;
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.08rem;
    background: #fff;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}

//入口导航栏
.entry-continer {
  margin-top: 10px;
  text-align: center;
  font-size: 0.48rem;
  color: #424242;
  border-top: 1px solid #d4d9de;
  border-bottom: 1px solid #d4d9de;
  .entry-nav {
    padding-top: 0.6rem;
    height: 5.16rem;
    transition: height 0.5s ease;
    overflow: hidden;
    .entry-nav-item {
      width: 25%;
      margin-bottom: 0.6rem;
      border-right: 1px solid #d4d9de;
      &:nth-child(4n) {
        border-right: none;
      }
    }
  }
  .entry-btn {
    height: 1rem;
    line-height: 1rem;
    padding: 5px auto;
    .btn-icon {
      margin-right: 0.12rem;
    }
  }
  // 导航栏折叠
  .close {
    height: 2.6rem;
  }
  .fold {
    transform: rotate(180deg);
  }
}

// 新闻资讯
</style>
