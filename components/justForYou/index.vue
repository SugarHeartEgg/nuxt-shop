<template>
  <div class="just-for-you">
    <div class="content_box">
      <div class="box">
        <div
          class="item"
          v-for="(item, index) in justForYouData"
          :key="index"
          @click="onShopClick(item)"
        >
          <div class="commisson_price_box" v-if="item.goodsInfoCommissonPrice">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jinbi" />
            </svg>
            <div
              class="commisson_price"
            >{{$t('money')}}{{item.goodsInfoCommissonPrice | money-init}}</div>
          </div>
          <img class="shop_img" :src="item.goodsInfoImgId" />
          <div class="content_detail">
            <div class="shop_name">{{item.goodsInfoName}}</div>
            <!-- 
                暂不需要，需要是可开放                
                <div class="flash_box">{{$t('just-for-you.flash')}}</div>
            -->
            <div class="money_box">
              <div class="buy_money">{{$t('money')}} {{item.goodsInfoPreferPrice | money-init}}</div>
              <div
                class="shop_money"
                v-if="item.marketPrice"
              >{{$t('money')}} {{item.marketPrice | money-init}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myJustForYou',
  props: {
    justForYouData: {
      type: Array,
    },
  },
  methods: {
    onShopClick(item) {
      this.$emit('on-just-shop', item)
    },
  },
}
</script>

<style lang="scss" scoped>
.just-for-you {
  .content_box {
    width: 100%;
    display: flex;
    // margin-top: 10px;
    .box {
      width: 100%;
      //   height: 100vh;
      //   display: flex;
      //   flex-flow: column wrap;
      //   overflow: hidden;

      //   padding: 0 13px 0 11px;
      column-count: 2;
      column-gap: 12px;
      border-radius: 10px;
      box-sizing: border-box;
      break-inside: avoid;
    }
    .item {
      //   width: 171px;
      margin-bottom: 12px;
      break-inside: avoid;
      box-sizing: border-box;
      border-radius: 10px;

      position: relative;
      background: #ffffff;
      .commisson_price_box {
        width: 76px;
        height: 20px;
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0 10px 0 10px;
        background: #fd3649;
        .icon {
          width: 10px;
          height: 10px;
          margin-right: 4px;
        }
        .commisson_price {
          color: #ffffff;
        }
      }
      .shop_img {
        width: 100%;
        height: auto;
        border-radius: 10px 10px 0 0;
      }

      .content_detail {
        padding: 5px 22px 8px 6px;
        .flash_box {
          width: 57px;
          height: 12px;
          margin-top: 16px;
          padding: 2px 3px 2px 2px;
          font-size: 10px;
          color: #ffffff;
          background: linear-gradient(to right, #ea4a52, #f9727e);
        }
        .shop_name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .money_box {
          padding-top: 12px;
          .buy_money {
            font-size: 17px;
            font-weight: 600;
            color: #e84a51;
          }
          .shop_money {
            text-decoration: line-through;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>