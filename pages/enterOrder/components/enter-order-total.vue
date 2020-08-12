<template>
  <div class="enter-order-total">
    <div class="total-box">
      <div class="title">{{$t('enter-order.amount')}}</div>
      <div>{{$t('money')}}{{goodsTotalAmount|money-init}}</div>
    </div>
    <div class="total-box">
      <div class="title">{{$t('enter-order.shipping-fee')}}</div>
      <div>{{$t('money')}}{{freightTotalAmount|money-init}}</div>
    </div>
    <!-- 暂无优惠券功能，先隐藏 -->
    <!-- <div class="total-box">
      <div class="title">{{$t('enter-order.discount')}}</div>
      <div>{{$t('money')}}{{123|money-init}}</div>
    </div>-->
  </div>
</template>

<script>
export default {
  props: {
    goodsTotalAmount: Number,
    freightTotalAmount: Number,
  },
}
</script>

<style lang="scss" scoped>
.enter-order-total {
  .total-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 25px;
    .title {
      font-size: 12px;
      color: #666666;
    }
  }
}
</style>