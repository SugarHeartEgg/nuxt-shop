<template>
  <div class="my_loading">
    <van-overlay :show="show" @click="show = true">
      <van-loading class="loading" vertical>{{loadingText}}</van-loading>
    </van-overlay>
  </div>
</template>

<script>
export default {
  props: {
    loadingText: {
      type: String,
      default: '加载中'
    }
  },
  data() {
    return {
      show: true
    }
  }
}
</script>

<style lang="scss" scoped>
.my_loading {
  ::v-deep .van-overlay {
    z-index: 99;
  }
  .loading {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>