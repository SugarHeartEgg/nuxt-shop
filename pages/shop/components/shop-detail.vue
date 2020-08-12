<template>
  <div class="shop-detail">
    <div class="detail_box" v-html="goodsDetailDesc"></div>
  </div>
</template>

<script>
export default {
  props: {
    goodsDetailDesc: {
      type: String,
      default: ''
    },
  },
}
</script>

<style lang="scss" scoped>
.shop-detail {
  width: 100%;
  margin-top: 10px;
  .detail_box {
    width: 100%;
  }
}
</style>