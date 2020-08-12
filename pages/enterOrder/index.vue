<template>
  <div class="order-index">
    <group-list>
      <van-nav-bar
        :title="$t('enter-order.title')"
        left-arrow
        placeholder
        fixed
        :border="false"
        @click-left="onClickLeft"
      />
      <enter-order-address :addressData="addressData" @click-address="changeAddress" />
      <div class="payment-method_box">
        <div class="payment_header">
          <div class="payment-title">{{$t('enter-order.payment-method.title')}}</div>
          <div
            class="wallet-money"
          >{{$t('enter-order.payment-method.wallet')}} {{enterData.deductAmount | money-init}} {{$t('money-tow')}}</div>
        </div>
        <div class="payment_content">
          <select-payment-method :selectPaymentId.sync="paymentId" />
        </div>
      </div>
      <div class="order-info-box">
        <enterOrderShopIfo :shopData="enterData.confirmOrderDTOList" />
      </div>
      <div class="order-coupon-box">
        <!-- <enter-order-coupon /> -->
      </div>
      <div class="order-total-box">
        <enter-order-total
          :goodsTotalAmount="enterData.goodsTotalAmount"
          :freightTotalAmount="enterData.freightTotalAmount"
        />
      </div>
      <div class="order-footer">
        <van-tabbar :placeholder="true" :safe-area-inset-bottom="true">
          <template>
            <div class="footer-content">
              <div class="money-box">
                <div>{{$t('enter-order.total')}}:</div>
                <div class="total-money">{{$t('money')}} {{enterData.totalAmount | money-init}}</div>
              </div>
              <div class="button-box">
                <van-button
                  class="submit-button"
                  round
                  color="#e84a51"
                  @click="onSubmitOrder"
                >{{$t('enter-order.submit-order')}}</van-button>
              </div>
            </div>
          </template>
        </van-tabbar>
      </div>
    </group-list>
    <my-address :showAddress="showAddress" @click-show="changeShow" @click-set="changeAddress" />
    <form
      ref="form"
      v-show="false"
      method="post"
      name="ePayment"
      action="https://payment.ipay88.com.my/ePayment/entry.asp"
    >
      <input type="hidden" name="MerchantCode" :value="form.MerchantCode" />
      <input type="hidden" name="PaymentId" :value="form.PaymentId" />
      <input type="hidden" name="RefNo" :value="form.RefNo" />
      <input type="hidden" name="Amount" :value="form.Amount" />
      <input type="hidden" name="Currency" :value="form.Currency" />
      <input type="hidden" name="ProdDesc" :value="form.ProdDesc" />
      <input type="hidden" name="UserName" :value="form.UserName" />
      <input type="hidden" name="UserEmail" :value="form.UserEmail" />
      <input type="hidden" name="UserContact" :value="form.UserContact" />
      <input type="hidden" name="Remark" :value="form.Remark" />
      <input type="hidden" name="Lang" :value="form.Lang" />
      <input type="hidden" name="SignatureType" :value="form.SignatureType" />
      <input type="hidden" name="Signature" :value="form.Signature" />
      <input type="hidden" name="ResponseURL" :value="form.ResponseURL" />
      <input type="hidden" name="BackendURL" :value="form.BackendURL" />
    </form>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { isArray } from '~/assets/utils/validate'

import groupList from '~/components/groupList'
import selectPaymentMethod from '~/components/selectPaymentMethod'
import myAddress from '~/components/myAddress'

import enterOrderAddress from './components/enter-order-address'
import enterOrderShopIfo from './components/enter-order-shopIfo'
import enterOrderCoupon from './components/enter-order-coupon'
import enterOrderTotal from './components/enter-order-total'

import { getAddressLit } from '~/assets/utils/api/address/api-serve'
import {
  getEnterData,
  setSubmitOreder,
} from '~/assets/utils/api/order/api-serve'
export default {
  layout: 'newtam',
  name: 'myEnterOrder',
  data() {
    return {
      form: {},
      enterData: {},
      paymentId: '210',
      addressData: {},
      showAddress: false,

      cartIdList: this.$route.query.cartIdList || null,
      addressId: this.$route.query.addressId || null,
      goodsInfoId: this.$route.query.goodsInfoId || null,
      goodsNum: this.$route.query.goodsNum || null,
      type: this.$route.query.type || null,
    }
  },
  created() {
    this.getEnterData()
    this.getAddressData()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    changeShow() {
      // this.showAddress = !this.showAddress
      // this.getEnterData()
    },
    changeAddress() {
      // 去地址库
      this.$router.push(this.localeRoute({ name: 'address-editAddress' }))
      // console.log('to address')
    },

    onSubmitOrder: debounce(async function () {
      const response = await setSubmitOreder(
        {
          $axios: this.$axios,
        },
        {
          addressId: this.addressId,
          submitOrderSkuList: [
            {
              goodsInfoId: this.goodsInfoId,
              goodsNum: this.goodsNum,
            },
          ],
          type: this.type,
        }
      )
      const paymentAmount = response.paymentAmount
      console.log(paymentAmount == 0.0)
      if (paymentAmount == 0.0 || this.paymentId == '0') {
        this.$router.push(
          this.localeRoute({
            name: 'enterOrder-successAnderror',
            query: { response },
          })
        )
      } else {
        // 调用iplay88 支付接口
        this.$toast(`iplay88需要支付${response.paymentAmount}`)
      }
    }, 1000),

    async getAddressData() {
      const response = await getAddressLit({
        $axios: this.$axios,
      })
      console.log(response.length)
      if (response.length == 0) {
        this.showAddress = !this.showAddress
      } else {
        const result = response.filter((item) => {
          return item.defaultState == true
        })
        this.addressData = result[0]
        this.addressId = result[0]['addressId']
      }
    },

    async getEnterData() {
      // 这里把this.cartIdList这样做的目的是，后端希望的cartIdList是数组，
      // 可以因为在url 传参会把数组格式转化为字符串
      // Ps: 1.引用类型要跨页面用vuex
      //     2.或者是全局变量
      //     3.挂到全局Vue里
      //     4.浏览器的缓存（LS,SS）
      // 我这里是图个方便
      let cartid
      if (isArray(this.cartIdList)) {
        cartid = this.cartIdList
      } else {
        cartid = new Array(this.cartIdList)
      }
      const response = await getEnterData(
        {
          $axios: this.$axios,
        },
        {
          cartIdList: cartid,
          addressId: this.addressId,
          goodsInfoId: this.goodsInfoId,
          goodsNum: this.goodsNum,
          type: Number(this.type),
        }
      )
      this.enterData = response
    },
  },
  components: {
    groupList,
    selectPaymentMethod,
    myAddress,

    enterOrderAddress,
    enterOrderShopIfo,
    enterOrderCoupon,
    enterOrderTotal,
  },
}
</script>

<style lang="scss" scoped>
.order-index {
  .van-list {
    min-height: 100vh;
    padding-bottom: 10px;
    background: #f4f1f4;
    ::v-deep .van-nav-bar__placeholder {
      .van-nav-bar {
        background: #e84a52;
        .van-nav-bar__left {
          padding-left: 11px;
          .van-icon {
            color: #ffffff;
          }
        }
        .van-nav-bar__title {
          font-size: 18px;
          color: #ffffff;
        }
      }
    }
    .payment-method_box {
      margin-top: 10px;
      border-radius: 10px;
      background: #ffffff;
      .payment_header {
        padding: 16px 11px 0 11px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .payment-title {
          font-size: 15px;
          font-weight: 600;
        }
        .wallet-money {
          font-size: 13px;
          font-weight: 600;
        }
      }
      .payment_content {
        padding: 12px 11px 10px 11px;
      }
    }
    .order-info-box {
      margin-top: 10px;
      padding: 10px 11px 15px 11px;
      border-radius: 10px;
      background: #ffffff;
    }
    .order-coupon-box {
      margin-top: 10px;
    }
    .order-total-box {
      padding: 11px;
      margin-top: 10px;
      border-radius: 10px;
      background: #ffffff;
    }
    .order-footer {
      ::v-deep .van-tabbar {
        height: 48px;
        .footer-content {
          width: 100%;
          padding: 0 11px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .money-box {
            display: flex;
            align-items: center;
            .total-money {
              margin-left: 4px;
              font-size: 18px;
              color: #e84a51;
            }
          }
          .button-box {
            .submit-button {
              height: 35px;
            }
          }
        }
      }
    }
  }
}
</style>