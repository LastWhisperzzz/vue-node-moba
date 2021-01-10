<template>
  <!-- 标题 -->
  <div class="card bg-white">
    <div class="card-header d-flex ai-center">
      <slot name="icon-left"> </slot>
      <div class="title flex-1">{{ title }}</div>
      <slot name="icon-right"></slot>
      <slot name="img"></slot>
    </div>

    <!-- 导航栏 -->
    <div class="card-nav d-flex jc-between">
      <div
        class="card-nav-item"
        :class="{ active: active === i }"
        v-for="(item, i) in categories"
        :key="i"
        @click="$refs.list.swiper.slideTo(i)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 内容 -->
    <div class="card-list">
      <swiper
        ref="list"
        :options="{ autoHeight: true }"
        @slide-change="() => (active = $refs.list.swiper.realIndex)"
      >
        <swiper-slide v-for="(item, i) in categories" :key="i">
          <slot name="items" :category="item"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: { type: String, required: true },
    categories: { type: Array, required: true },
    plain: { type: Boolean }
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss">
.card {
  border-bottom: 1px solid #d4d9de;
  margin-top: 0.5rem;
  padding: 0 0.6rem;
  .card-header {
    border-bottom: 1px solid #e9ecee;
    padding: 0.5rem 0;
    margin-bottom: 0.4rem;
    .title {
      font-size: 0.64rem;
      padding-left: 0.24rem;
    }
  }
  .card-nav {
    font-size: 0.52rem;
    .card-nav-item {
      border-bottom: 3px solid transparent;
      padding-bottom: 0.1rem;
    }
    .active {
      color: #db9e3f;
      border-bottom-color: #db9e3f;
    }
  }
  .card-list {
    font-size: 14px;
    padding-top: 0.48rem;
  }
}
</style>
