<template>
  <div class="shopList">
    <div
      class="shop_box"
      v-for="(item, index) in records"
      :key="index"
      @click="onShopDetail(item.goodsInfoId)"
    >
      <div class="activity">{{item.discount}}</div>
      <div class="goods_img_box">
        <div class="sold_out_box" v-if="!item.activityStock">{{$t('home.shop-list.sold-out')}}</div>
        <van-image class="goods_img" :src="item.goodsInfoImgId" />
      </div>
      <div class="right_content">
        <div class="goods_text">{{item.goodsInfoName}}</div>
        <div class="tabs_tip">{{item.activitySales}} {{$t('home.shop-list.sold')}}</div>
        <div class="money_button_box">
          <div class="shop_money">{{$t('money')}}{{item.goodsInfoPreferPrice | money-init}}</div>
          <div class="shop_button">
            <van-button
              v-if="item.activityStock"
              class="button_buy"
              color="#e84a51"
              round
            >{{$t('home.shop-list.button-buy')}}</van-button>
            <div v-if="!item.activityStock" class="button_out">{{$t('home.shop-list.button-out')}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    records: {
      type: Array
    }
  },
  methods: {
    onShopDetail(goodsInfoId) {
      this.$router.push(
        this.localeRoute({ name: 'shop', query: { goodsInfoId } })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.shopList {
  .shop_box {
    height: 156px;
    margin-bottom: 6px;
    display: flex;
    position: relative;
    border-radius: 10px;
    background: #ffffff;
    .activity {
      width: 48px;
      height: 15px;
      line-height: 17px;
      text-align: center;
      position: absolute;
      font-size: 10px;
      z-index: 1;
      border-radius: 10px 0 10px 0;
      background: linear-gradient(to right, #ff987c 20%, #ff3b46 60%);
      color: #ffffff;
    }
    .goods_img_box {
      width: 156px;
      height: 156px;
      position: relative;
      .sold_out_box {
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 23px;
        font-weight: 600;
        z-index: 1;
        opacity: 0.8;
        color: #ffffff;
        background: #7f7f7f;
        border-radius: 10px 0 0 10px;
      }
      .goods_img {
        width: 100%;
        height: 100%;
        ::v-deep .van-image__img {
          border-radius: 10px 0 0 10px;
        }
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
        width: 55px;
        height: 14px;
        margin-top: 9px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #e84a51;
        border-radius: 3px;
        color: #e84a51;
      }
      .money_button_box {
        margin-top: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .shop_money {
          font-size: 15px;
          font-weight: 600;
          color: #e84a51;
        }
        .button_buy {
          width: 66px;
          height: 25px;
          font-size: 12px;
          font-weight: 600;
          padding: 0;
        }
        .button_out {
          width: 66px;
          height: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
          padding: 0;
          border-radius: 20px;
          background: #dddddd;
          color: #ffffff;
        }
      }
    }
  }
}
</style>