<template>
  <div class="shop-flash" v-if="_isShowShopFlash">
    <div class="flash-box">
      <div class="left">
        <div class="shop-money_box">
          <div class="price">{{$t('money')}}{{saleDetailDTO.activityPrice | money-init}}</div>
          <div class="delete_price">{{$t('money')}}{{goodsInfoPreferPrice | money-init}}</div>
        </div>
        <div class="inds_time">
          {{$t('shop.in')}}
          <van-count-down :time="time" />
        </div>
      </div>
      <div class="right">
        <div class="flash-title">{{$t('shop.flash-title')}}</div>
        <div class="heat">
          <svg class="heat_icon" aria-hidden="true">
            <use xlink:href="#icon-huo" />
          </svg>
          <div class="progress_box" v-if="_isShowShopFlash">
            <div class="progress_text">{{saleDetailDTO.progressBar}}% {{$t('shop.progress-text')}}</div>
            <van-progress
              :show-pivot="false"
              :percentage="saleDetailDTO.progressBar"
              stroke-width="12"
              track-color="#ffffff"
              color="#FC3549"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validMillisecond } from '~/assets/utils/validate'
export default {
  props: {
    goodsInfoPreferPrice: {
      type: Number
    },
    saleDetailDTO: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    time() {
      return validMillisecond(this.saleDetailDTO.expire)
    },
    _isShowShopFlash() {
      // 当限时活动存在，显示，否则反之
      return this.saleDetailDTO.hasOwnProperty('saleId')
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-flash {
  background: #ffffff;
  .flash-box {
    height: 58px;
    padding: 9px 16px 0 11px;
    display: flex;
    background: url('~assets/images/shop/flash.png');
    background-size: 100% 100%;
    .left {
      .shop-money_box {
        display: flex;
        align-items: baseline;
        .price {
          margin-right: 11px;
          font-size: 23px;
          font-weight: 600;
          color: #ffffff;
        }
        .delete_price {
          font-size: 11px;
          text-decoration: line-through;
          color: #ffffff;
        }
      }
      .inds_time {
        margin-top: 5px;
        display: flex;
        align-items: center;
        color: #ffffff;
        ::v-deep .van-count-down {
          margin-left: 5px;
          color: #ffffff;
        }
      }
    }
    .right {
      flex: 1;
      text-align: right;
      .flash-title {
        font-size: 15px;
        font-weight: 600;
        color: #fd3549;
      }
      .heat {
        margin-top: 12px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .heat_icon {
          width: 12px;
          height: 14px;
        }
        .progress_box {
          position: relative;
          .progress_text {
            font-size: 10px;
            position: absolute;
            color: #f4cd32;
            z-index: 1;
          }
          ::v-deep .van-progress {
            width: 77px;
          }
        }
      }
    }
  }
}
</style>