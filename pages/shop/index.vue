<template>
  <div class="shop">
    <group-list
      :groupListLoading.sync="loading"
      :groupListFinished="finished"
      @sync-load="OnSyncLoad"
    >
      <shop-header :skuImageList="goosData.skuImageList" />
      <shop-flash
        :goodsInfoPreferPrice="goosData.goodsInfoPreferPrice"
        :saleDetailDTO="goosData.saleDetailDTO"
      />
      <shop-title :goodsInfoName="goosData.goodsInfoName" />
      <shop-vip
        :goodsInfoCommissonPrice="goosData.goodsInfoCommissonPrice"
        :goodsInfoCommissonPriceTips="goosData.goodsInfoCommissonPriceTips"
        :shareTips="goosData.shareTips"
      />
      <shop-selected
        :specImageList="goosData.specImageList"
        :specName="goosData.specName"
        :skuNumber="goosData.skuNumber"
        @onShowSku="onShowSkuBox"
      />
      <shop-address
        :computeFreight="computeFreight"
        :deliveryDay="goosData.deliveryDay"
        @click-showAddress="onShowAddress"
      />
      <shop-payment-method />
      <shop-serve />
      <shop-reviews v-if="false" />
      <shop-detail :goodsDetailDesc="goosData.goodsDetailDesc" />

      <div class="just_shop_box">
        <div class="icon_title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-cainixihuan" />
          </svg>
          <div class="text">{{$t('shop.just-for-you')}}</div>
        </div>
        <just-for-you :justForYouData="justForYouData" @on-just-shop="onShopDetail" />
      </div>
      <shop-tabbar
        :skuState="goosData.skuState"
        :cartCount="cartNum"
        @click-chat="changeChat"
        @click-cart="changeCart"
        @click-add="onAdd"
        @click-buy="onBuy"
      />
      <select-add :showSelectAddress.sync="showSelectAddress" />
      <shop-sku
        :showSku.sync="showSku"
        :quantityNum.sync="goodsNum"
        :showButton="showButton"
        :spuSpecList="goosData.spuSpecList"
        :skuState="goosData.skuState"
        :specName="goosData.specName"
        :goodsInfoImgId="goosData.goodsInfoImgId"
        :goodsInfoRealStock="goosData.goodsInfoRealStock"
        :goodsInfoPreferPrice="goosData.goodsInfoPreferPrice"
        @on-spe-method="changeSpe"
        @click-add-cart="changeAdd"
        @click-new-buy="changeBuy"
      />
    </group-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import groupList from '~/components/groupList'
import justForYou from '~/components/justForYou'
import selectAdd from '~/components/selectAdd'

import shopHeader from './components/shop-header'
import shopFlash from './components/shop-flash'
import shopTitle from './components/shop-title'
import shopVip from './components/shop-vip'
import shopSelected from './components/shop-selected'
import shopAddress from './components/shop-address'
import shopPaymentMethod from './components/shop-payment-method'
import shopServe from './components/shop-serve'
import shopReviews from './components/shop-reviews'
import shopDetail from './components/shop-detail'
import shopSku from './components/shop-sku'
import shopTabbar from './components/shop-tabbar'

import { getGoogsData, getGoogsDatas } from '~/assets/utils/api/shop/api-serve'
import { getCartCount, setAddCart } from '~/assets/utils/api/cart/api-serve'
import { getJustFouYou } from '~/assets/utils/api/justForYou/api-serve'
export default {
  layout: 'newtam',
  name: 'myshopDetail',
  data() {
    return {
      computeFreight: {},
      cartCount: 0,
      justForYouData: [],
      loading: false,
      finished: false,
      showSku: false,
      showButton: '',
      showSelectAddress: false,

      goodsInfoId: null,
      goodsNum: 1,
    }
  },
  async asyncData({ $axios, query }) {
    const goosData = await getGoogsData(
      { $axios },
      {
        goodsInfoId: query.goodsInfoId,
      }
    )
    return {
      goosData,
    }
  },
  computed: {
    ...mapState('cart', {
      cartNum: 'cartNum',
    }),
  },
  created() {
    this.getComputeFreight()
    this.getCartStore()
  },
  methods: {
    // 猜你喜欢去详情
    onShopDetail(item) {
      this.$router.push(
        this.localeRoute({
          name: 'shop',
          query: { goodsInfoId: item.goodsInfoId },
        })
      )
    },
    // 去确认订单页
    changeBuy() {
      this.$router.push(
        this.localeRoute({
          name: 'enterOrder',
          query: {
            addressId: this.computeFreight.addressId,
            goodsInfoId: this.goosData.goodsInfoId,
            goodsNum: this.goodsNum,
            type: 1,
          },
        })
      )
    },
    async changeAdd() {
      const response = await setAddCart(
        {
          $axios: this.$axios,
        },
        {
          goodsNum: this.goodsNum,
          id: this.goosData.goodsInfoId,
          type: 1,
        }
      )
      this.$toast.success(this.$t('shop.shop-tabbar.add-success'))
      this.getCartStore()
      this.showSku = !this.showSku
    },

    // 显示地址弹框
    onShowAddress() {
      // 需求不需要弹框跳出，直接去地址库
      // this.showSelectAddress = !this.showSelectAddress
      this.$router.push(this.localeRoute({ name: 'address' }))
    },
    // 显示sku弹框
    onShowSkuBox() {
      this.showSku = !this.showSku
      this.showButton = ''
    },
    // 规格弹框
    async changeSpe(params) {
      const goodsData = await getGoogsDatas(
        { $axios: this.$axios },
        {
          goodsId: this.goosData.goodsId,
          spec: params,
        }
      )
      this.goosData = goodsData
    },

    changeChat() {
      this.$toast('去客服')
    },
    changeCart() {
      this.$router.push(this.localeRoute({ name: 'shoppingCart' }))
    },

    onAdd(params) {
      console.log(params)
      this.showSku = !this.showSku
      this.showButton = params
    },
    onBuy(params) {
      console.log(params)
      this.showSku = !this.showSku
      this.showButton = params
    },

    // 运费 以及 默认地址
    async getComputeFreight() {
      this.computeFreight = await this.$axios.$get(
        `/customer-service/address/computeFreight?addressId=${''}`
      )
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
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      this.$router.go(0)
    },
  },
  components: {
    groupList,
    justForYou,
    selectAdd,

    shopHeader,
    shopFlash,
    shopTitle,
    shopVip,
    shopSelected,
    shopAddress,
    shopPaymentMethod,
    shopServe,
    shopReviews,
    shopDetail,
    shopSku,
    shopTabbar,
  },
}
</script>

<style lang="scss" scoped>
.shop {
  padding-bottom: 20px;
  background: #f2f2f2;
  .just_shop_box {
    padding: 0 13px 0 11px;
    .icon_title {
      margin-bottom: 26px;
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
}
</style>