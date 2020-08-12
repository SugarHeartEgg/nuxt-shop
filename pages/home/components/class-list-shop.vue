<template>
  <div class="shopList">
    <div
      class="shop_box"
      v-for="(item, index) in records"
      :key="index"
      @click="onShopDetail(item.goodsInfoId)"
    >
      <div class="goods_img_box">
        <div class="activity" v-if="item.goodsInfoCommissonPrice">
          <div class="icon_box">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jinbi" />
            </svg>
          </div>
          <div class="commisson_price">{{$t('money')}}{{item.goodsInfoCommissonPrice | money-init}}</div>
        </div>
        <img class="goods_img" :src="item.goodsInfoImgId" />
      </div>
      <div class="right_content">
        <div class="goods_text">{{item.goodsInfoName}}</div>
        <!-- 不需要 -->
        <!-- <div class="tabs_tip">{{$t('home.class-list.class-flash')}}</div> -->
        <div class="money_button_box">
          <div class="shop_money">{{$t('money')}}{{item.goodsInfoPreferPrice | money-init}}</div>
          <div class="activity_money">{{$t('money')}}{{item.activityPrice | money-init}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    records: {
      type: Array,
    },
  },
  data() {
    return {}
  },
  methods: {
    onShopDetail(goodsInfoId) {
      this.$router.push(
        this.localeRoute({ name: 'shop', query: { goodsInfoId } })
      )
      // console.log(goodsInfoId)
    },
  },
}
</script>

<style lang="scss" scoped>
.shopList {
  padding: 10px 11px 10px 11px;
  background: #f2f2f2;
  .shop_box {
    height: 156px;
    margin-bottom: 6px;
    display: flex;
    border-radius: 10px;
    background: #ffffff;

    .goods_img_box {
      width: 156px;
      height: 156px;
      position: relative;
      .activity {
        width: 66px;
        height: 20px;
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        padding: 0 4px 0 11px;
        z-index: 1;
        border-radius: 0 0 0 10px;
        background: #fd3649;
        .icon_box {
          .icon {
            width: 15px;
            height: 15px;
          }
        }
        .commisson_price {
          font-size: 11px;
          color: #ffffff;
        }
      }
      .goods_img {
        width: 100%;
        height: 100%;
        border-radius: 10px 0 0 10px;
      }
    }
    .right_content {
      flex: 1;
      padding: 9px 13px 0 15px;

      .goods_text {
        height: 50px;
        font-size: 14px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .tabs_tip {
        width: 71px;
        height: 21px;
        margin-top: 11px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        background: linear-gradient(to right, #e84b52, #fa7481);
        color: #ffffff;
      }
      .money_button_box {
        margin-top: 18px;
        .shop_money {
          font-size: 15px;
          font-weight: 600;
          color: #e84a51;
        }
        .activity_money {
          margin-top: 6px;
          font-size: 12px;
          color: #666666;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>