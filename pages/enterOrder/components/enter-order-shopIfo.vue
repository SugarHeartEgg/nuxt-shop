<template>
  <div class="enter-order-shopIfo">
    <div class="shop_info_box" v-for="(item, index) in shopData" :key="index">
      <div class="title">{{item.supplierName}}</div>
      <div class="content" v-for="(items, index) in item.confirmOrderSkuDTOList" :key="index">
        <div class="info-img-box">
          <img class="info-img" :src="items.goodsInfoImgId" />
        </div>
        <div class="message_box">
          <div class="title">{{items.goodsInfoName}}</div>
          <div class="format_num">
            <div class="format">{{items.specName}}</div>
            <div class="num">x{{items.goodsNum}}</div>
          </div>
          <div class="money">{{$t('money')}}{{items.goodsInfoPreferPrice | money-init}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shopData: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.enter-order-shopIfo {
  .shop_info_box {
    .title {
      font-size: 12px;
      font-weight: 600;
    }
    .content {
      margin-top: 10px;
      display: flex;
      .info-img-box {
        width: 100px;
        height: 100px;
        .info-img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .message_box {
        margin-left: 9px;
        flex: 1;
        .title {
          max-width: 203px;
          display: -webkit-box;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .format_num {
          margin-top: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
          color: #8b888c;
        }
        .money {
          margin-top: 28px;
          color: #e84a51;
        }
      }
    }
  }
}
</style>