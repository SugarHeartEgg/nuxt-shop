<template>
  <div class="enter-order-classPayment">
    <van-radio-group class="payment_group" v-model="_selectPaymentId">
      <div
        class="payment_box"
        v-for="(item, index) in paymentList"
        :key="index"
        @click="onPaymentBox(item.paymentId)"
      >
        <div class="payment_info">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.class" />
          </svg>
          <span class="payment_name">{{item.name}}</span>
        </div>
        <div class="select_radio">
          <van-radio :name="item.paymentId" checked-color="#fa506a"></van-radio>
        </div>
      </div>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    selectPaymentId: {
      type: String,
      default: '210',
    },
  },
  data() {
    return {
      paymentList: [
        {
          class: '#icon-zhifuxin',
          name: 'Boots Pay',
          paymentId: '210',
        },
        {
          class: '#icon-touchnGO',
          name: `Touch'n Go`,
          paymentId: '538',
        },
        {
          class: '#icon-FPX',
          name: `FPX(${this.$t('enter-order.payment-method.fpx')})`,
          paymentId: '16',
        },
        {
          class: '#icon-huodaofukuan2',
          name: `${this.$t('enter-order.payment-method.cod')}`,
          paymentId: '0',
        },
      ],
    }
  },
  computed: {
    _selectPaymentId: {
      get() {
        return this.selectPaymentId
      },
      set(v) {
        return this.$emit('update:selectPaymentId', v)
      },
    },
  },
  methods: {
    onPaymentBox(paymentId) {
      this.$emit('update:selectPaymentId', paymentId)
    },
  },
}
</script>

<style lang="scss" scoped>
.enter-order-classPayment {
  .payment_group {
    .payment_box {
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .payment_info {
        display: flex;
        align-items: center;
        .icon {
          width: 25px;
          height: 25px;
          margin-right: 14px;
        }
        .payment_name {
          font-size: 13px;
        }
      }
    }
  }
}
</style>