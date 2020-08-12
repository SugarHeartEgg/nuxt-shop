<template>
  <div class="null-cart">
    <div class="content">
      <div class="header">
        <img class="img" src="~assets/images/cart/cart.png" />
      </div>
      <div class="text">{{$t('cart-list.null-cart.text')}}</div>
      <div class="shopping-button">
        <van-button round color="#e94950" @click="onShopping">{{$t('cart-list.null-cart.shopping')}}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onShopping() {
      this.$emit('click-shopping')
    },
  },
}
</script>

<style lang="scss" scoped>
.null-cart {
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .header {
      width: 100%;
      height: 203px;
      .img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      margin-top: 40px;
      font-size: 19px;
      color: #838383;
    }
    .shopping-button {
      margin-top: 29px;
      ::v-deep .van-button {
        width: 256px;
        height: 42px;
      }
    }
  }
}
</style>