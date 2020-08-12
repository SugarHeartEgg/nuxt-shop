<template>
  <div class="content_box">
    <groupList :groupListLoading.sync="loading" :groupListFinished="finished" @sync-load="OnSyncLoad">
      <div class="home">
        <div class="home_header_box">
          <nav-top />
          <home-header :homepageDTOList="homepageDTOList" />
          <serving />
          <movable />
          <classify :homeHotCategoryDTOList="homeHotCategoryDTOList" />
          <div class="just_shop_box">
            <div class="icon_title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-cainixihuan" />
              </svg>
              <div class="text">{{$t('shop.just-for-you')}}</div>
            </div>
            <just-for-you :justForYouData="justForYouData" @on-just-shop="onShopDetail" />
          </div>
          <snapped-up v-if="homeSaleDTOList.length" :homeSaleDTOList="homeSaleDTOList" />
        </div>
      </div>
    </groupList>
  </div>
</template>

<script>
import navTop from '~/components/navTop'
import myLoading from '~/components/myLoading'
import groupList from '~/components/groupList'
import justForYou from '~/components/justForYou'

import homeHeader from './components/header'
import serving from './components/serving'
import movable from './components/movable'
import classify from './components/classify'
import snappedUp from './components/snappedUp'

import { getJustFouYou } from '~/assets/utils/api/justForYou/api-serve'

export default {
  name: 'myhome',
  data() {
    return {
      justForYouData: [],
      loading: false,
      finished: false,
    }
  },
  async asyncData({ $axios }) {
    const {
      homepageDTOList,
      homeSaleDTOList,
      homeHotCategoryDTOList,
    } = await $axios.$get('goods-service/home/get')
    return { homepageDTOList, homeSaleDTOList, homeHotCategoryDTOList }
  },
  methods: {
    // to商品详情
    onShopDetail(item) {
      this.$router.push(
        this.localeRoute({
          name: 'shop',
          query: { goodsInfoId: item.goodsInfoId },
        })
      )
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
  components: {
    navTop,
    myLoading,
    groupList,
    justForYou,

    homeHeader,
    serving,
    movable,
    classify,
    snappedUp,
  },
}
</script>

<style lang="scss" scoped>
.content_box {
  .home {
    padding-bottom: 10px;
    background: #f2f2f2;
    .home_header_box {
      min-height: 100vh;
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
  }
}
</style>