<template>
  <div class="success-and-error">
    <groupList
      :groupListLoading.sync="loading"
      :groupListFinished="finished"
      @sync-load="OnSyncLoad"
    >
      <div class="page-box">
        <div class="header">
          <van-nav-bar :title="_navTitle" left-arrow fixed placeholder @click-left="onClickLeft" />
        </div>
        <div class="content-box">
          <div class="content">
            <div class="content-img-box">
              <!-- <img src="~assets/images/enterOrder/success.png" /> -->
              <img class="img" src="~assets/images/enterOrder/error.png" />
            </div>
            <div class="order-amount">{{$t('success-error.order-amount')}}：{{123|money-init}}</div>
            <div class="ship-text" v-if="isshow">{{$t('success-error.ship-text')}}</div>
            <div class="ship-text" v-else>{{$t('success-error.ship-text-failed')}}</div>
            <div class="button-box">
              <!-- 支付成功 -->
              <van-button
                v-if="isshow"
                round
                plain
                color="#e74a51"
                @click="onOrder"
              >{{$t('success-error.view-order')}}</van-button>
              <van-button
                v-if="isshow"
                round
                color="#e74a51"
                @click="onHome"
              >{{$t('success-error.to-ome')}}</van-button>
              <!-- 支付成功 End-->

              <!-- 支付失败 -->
              <van-button
                v-if="!isshow"
                round
                plain
                color="#e74a51"
                @click="onPayment"
              >{{$t('success-error.chanhe-payment')}}</van-button>
              <van-button
                v-if="!isshow"
                round
                color="#e74a51"
                @click="onRetry"
              >{{$t('success-error.retry')}}</van-button>
              <!-- 支付失败 End-->
            </div>
          </div>
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
      </div>
    </groupList>
  </div>
</template>

<script>
import groupList from '~/components/groupList'
import justForYou from '~/components/justForYou'

import { getJustFouYou } from '~/assets/utils/api/justForYou/api-serve'
export default {
  layout: 'newtam',
  name: 'mySuccessAnderror',
  data() {
    return {
      isshow: false,
      showTitle: 'cod',
      loading: false,
      finished: false,
      justForYouData: [],
    }
  },
  computed: {
    _navTitle() {
      if (this.showTitle == 'cod') {
        return this.$t('success-error.cod-title')
      } else {
        return this.$t('success-error.title')
      }
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onOrder() {
      this.$toast('去订单列表')
    },
    onHome() {
      this.$router.push(this.localeRoute({ name: 'home' }))
    },
    onPayment() {
      this.$toast('切换支付方式')
    },
    onRetry() {
      this.$toast('重试支付')
    },
    // 猜你喜欢去详情
    onShopDetail(item) {
      this.$router.push(
        this.localeRoute({
          name: 'shop',
          query: { goodsInfoId: item.goodsInfoId },
        })
      )
    },
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
  components: {
    groupList,
    justForYou,
  },
}
</script>

<style lang="scss" scoped>
.success-and-error {
  min-height: 100vh;
  background: #f7f7f7;
  .header {
    ::v-deep .van-nav-bar {
      .van-nav-bar__left {
        padding-left: 12px;
        .van-icon {
          font-size: 16px;
          color: #333333;
        }
      }
      .van-nav-bar__title {
        font-size: 17px;
      }
    }
  }
  .content-box {
    padding-bottom: 16px;
    background: #ffffff;
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 45px;
      .content-img-box {
        width: 119px;
        height: 120px;
        margin-top: 17px;
        .img {
          width: 100%;
          height: 100%;
        }
      }
      .order-amount {
        margin-top: 15px;
        font-size: 17px;
        font-weight: 600;
        color: #e74a51;
      }
      .ship-text {
        text-align: center;
        margin-top: 21px;
        font-size: 14px;
      }
      .button-box {
        width: 100%;
        margin-top: 19px;
        display: flex;
        justify-content: space-between;
        ::v-deep .van-button {
          width: 129px;
          height: 41px;
          font-size: 15px;
        }
      }
    }
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
}
</style>