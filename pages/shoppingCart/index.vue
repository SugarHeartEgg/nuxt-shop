<template>
  <div class="shopping-cart">
    <groupList
      :groupListLoading.sync="loading"
      :groupListFinished="finished"
      @sync-load="OnSyncLoad"
    >
      <div class="cart-shop-box">
        <div class="header">
          <van-nav-bar
            :title="$t('cart-list.title')"
            :left-arrow="showLeftIcon"
            fixed
            placeholder
            @click-left="onClickLeft"
          >
            <template #right>
              <div class="riht-text" @click="onClickRight">{{rightText}}</div>
            </template>
          </van-nav-bar>
        </div>
        <div class="null-cart-box" v-if="!_cartDataList && !_cartSkuExpiredList">
          <null-list @click-shopping="changeShopping"></null-list>
        </div>
        <div class="usable-box" v-if="_cartDataList">
          <!-- @click-check="changeCheck" -->
          <usable-list
            ref="refusable"
            :usableChecked.sync="usableChecked"
            :cartDataList="cartDataList"
            @click-box="changeBox"
            @click-delete="onCartDel"
          />
        </div>
        <div class="unavailable-box" v-if="_cartSkuExpiredList">
          <unavailable-list :cartSkuExpiredList="cartSkuExpiredList" @click-delete="onCartDel" />
        </div>
        <div class="just-for-you">
          <div class="icon_title">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-cainixihuan" />
            </svg>
            <div class="text">{{$t('shop.just-for-you')}}</div>
          </div>
          <just-for-you :justForYouData="justForYouData" @on-just-shop="onShopDetail" />
        </div>
        <div class="footer-box">
          <div class="footer-content">
            <div class="left" @click="cartCheckAll">
              <van-checkbox
                :disabled="!_cartDataList"
                v-model="usableChecked"
                checked-color="#e84a51"
              >{{$t('cart-list.check-box.all')}}</van-checkbox>
            </div>
            <div class="content">
              <div>{{$t('cart-list.check-box.shipping-fee')}}</div>
              <div class="total-box">
                <div class="text">{{$t('cart-list.check-box.total')}}：</div>
                <div class="color">{{$t('money')}} {{totalPrice | money-init}}</div>
              </div>
            </div>
            <div class="right">
              <van-button
                v-if="showRightText"
                :disabled="!selectedShop.length"
                round
                color="#e84a51"
                @click="onEnterPage"
              >{{$t('cart-list.check-box.check-out')}}</van-button>
              <van-button
                v-else
                :disabled="!selectedShop.length"
                round
                color="#e84a51"
                @click="onDelete"
              >{{$t('cart-list.check-box.del')}}</van-button>
            </div>
          </div>
        </div>
      </div>
    </groupList>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isArray } from '~/assets/utils/validate'

import groupList from '~/components/groupList'
import justForYou from '~/components/justForYou'

import nullList from './components/null-list'
import usableList from './components/usable-list'
import unavailableList from './components/unavailable-list'

import { getCartList, delCartShop } from '~/assets/utils/api/cart/api-serve'
import { getEnterData } from '~/assets/utils/api/order/api-serve'
import { getJustFouYou } from '~/assets/utils/api/justForYou/api-serve'

export default {
  name: 'myShoppingCart',
  data() {
    return {
      loading: false,
      finished: false,
      showLeftIcon: false,
      showRightText: true,
      checked: false,
      usableChecked: false,

      justForYouData: [],
      cartDataList: [], // 未过期 数据
      cartSkuExpiredList: [], // 已过期 数据

      selectedShop: [], // 已选中的商品
    }
  },
  computed: {
    rightText() {
      if (this.showRightText) {
        return this.$t('cart-list.title-right-text')
      } else {
        return this.$t('cart-list.title-right-text-cancel')
      }
    },
    _cartDataList() {
      if (isArray(this.cartDataList)) {
        return this.cartDataList.length
      }
    },
    _cartSkuExpiredList() {
      if (isArray(this.cartSkuExpiredList)) {
        return this.cartSkuExpiredList.length
      }
    },
    totalPrice() {
      let res = []
      if (this.cartDataList) {
        this.cartDataList.forEach((item) => {
          res = item.cartSkuDTOList.filter((items) => {
            return this.selectedShop.includes(items.cartId)
          })
        })
      }
      if (res.length) {
        const initialValue = 0
        return res.reduce((accumulator, currentValue) => {
          return (
            accumulator +
            currentValue.goodsInfoPreferPrice * currentValue.goodsNum
          )
        }, initialValue)
      } else {
        return 0
      }
    },
    ...mapState('cart', {
      cartNum: 'cartNum',
    }),
  },
  created() {
    this.getCartData()
    this.getCartStore()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.showRightText = !this.showRightText
      if (this.showRightText && this.usableChecked) {
        // this.cartCheckAll()
      }
    },
    onShopDetail(item) {
      this.$router.push(
        this.localeRoute({
          name: 'shop',
          query: { goodsInfoId: item.goodsInfoId },
        })
      )
    },
    changeShopping() {
      this.$router.push(this.localeRoute({ name: 'home' }))
    },
    async onEnterPage() {
      this.$router.push(
        this.localeRoute({
          name: 'enterOrder',
          query: {
            cartIdList: this.selectedShop,
            type: 2,
          },
        })
      )
    },
    // 删除购物车商品
    async onDelete(cartId) {
      const result = await delCartShop(
        {
          $axios: this.$axios,
        },
        {
          cartId: this.selectedShop.length ? this.selectedShop : cartId,
        }
      )
      console.log(result)
      this.getCartStore()
      this.getCartData()
    },

    cartCheckAll() {
      this.$refs.refusable.onCheckAll()
    },
    changeBox(e) {
      this.selectedShop = e
    },
    // 删除购物车商品
    onCartDel(cartId) {
      this.onDelete(cartId)
    },

    // 查询购物车数量
    getCartStore() {
      this.$store.dispatch('cart/getCartNum', {
        $axios: this.$axios,
      })
    },
    // 猜你喜欢
    async OnSyncLoad() {
      const resultData = await getJustFouYou(
        {
          $axios: this.$axios,
        },
        {
          size: 25,
        }
      )

      // 加载状态结束
      this.loading = false

      this.justForYouData = this.justForYouData.concat(resultData)

      // 返回的数据为空，说明数据已全部加载了
      if (resultData.length == 0) {
        this.finished = true
      }
    },
    // 购物车数据
    async getCartData() {
      const response = await getCartList({
        $axios: this.$axios,
      })
      this.cartDataList = response.cartList
      this.cartSkuExpiredList = response.cartSkuExpiredList
    },
  },
  components: {
    groupList,
    justForYou,

    nullList,
    usableList,
    unavailableList,
  },
}
</script>

<style lang="scss" scoped>
.shopping-cart {
  min-height: 100vh;
  background: #f2f2f2;
  .cart-shop-box {
    ::v-deep .van-nav-bar {
      background: #e94950;
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
      .van-nav-bar__right {
        .riht-text {
          font-size: 15px;
          color: #ffffff;
        }
      }
    }
    .null-cart-box {
      padding: 39px 43px 0 43px;
    }
    .usable-box {
      margin-top: 10px;
      padding: 18px 12px 17px 12px;
      border-radius: 10px;
      background: #ffffff;
    }
    .unavailable-box {
      margin-top: 10px;
      padding: 18px 12px 17px 12px;
      border-radius: 10px;
      background: #ffffff;
    }
    .just-for-you {
      margin-top: 22px;
      padding: 0 6px;
      .icon_title {
        margin-bottom: 19px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        .icon {
          width: 22px;
          height: 21px;
          margin-right: 7px;
        }
        .text {
          font-size: 15px;
          font-weight: 600;
        }
      }
    }
    .footer-box {
      width: 100%;
      height: 48px;
      position: fixed;
      right: 0;
      bottom: 50px;
      left: 0;
      background: #ffffff;
      .footer-content {
        padding: 0 11px;
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
        }
        .content {
          padding-top: 8px;
          .total-box {
            margin-top: 7px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .text {
              font-size: 15px;
              font-weight: 600;
            }
            .color {
              font-size: 15px;
              color: #e84a51;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          ::v-deep .van-button {
            width: 93px;
            height: 30px;
          }
        }
      }
    }
  }
}
</style>