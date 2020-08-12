<template>
  <div class="enter-order-coupon">
    <van-cell :title="$t('enter-order.coupon')" is-link @click="onCoupon">
      <template>
        <div class="discount">-{{$t('money')}}{{123 | money-init}}</div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  methods: {
    onCoupon() {
      console.log(123)
      this.$emit('click-coupon')
    },
  },
}
</script>

<style lang="scss" scoped>
.enter-order-coupon {
  ::v-deep .van-cell {
    height: 40px;
    padding: 11px;
    border-radius: 10px;
    .van-cell__title {
      font-size: 12px;
      color: #666666;
    }
    .discount {
      font-size: 12px;
      color: #e84a51;
    }
  }
}
</style>