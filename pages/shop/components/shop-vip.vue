<template>
  <div class="shop-vip">
    <div class="vip_box">
      <div class="left">
        <div class="top">
          <div class="vip_icon_box">
            <svg class="vip_icon" aria-hidden="true">
              <use xlink:href="#icon-viptubiao" />
            </svg>
          </div>
          <div class="candee_vip">{{$t('shop.vip.candee-vip')}}</div>
          <div class="tip_message" v-if="shareTips == 'Share'">{{$t('shop.vip.tip-message')}}</div>
          <div class="tip_message" v-if="shareTips == 'Open'">{{$t('shop.vip.tip-message-two')}}</div>
        </div>
        <div class="bottom">
          <!-- <span class="earns_message">{{$t('shop.vip.earns')}}</span> -->
          <span class="earns_message">{{goodsInfoCommissonPriceTips}}</span>
          <span class="earns_money">{{goodsInfoCommissonPrice | money-init}}{{$t('money-tow')}}</span>
        </div>
      </div>
      <div class="right" @click="onOpenOrShare">
        <div class="share_button">{{shareTips}}</div>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhuanfaanniu" />
        </svg>
      </div>
    </div>

    <share :shareshow.sync="shareshow" :share="share" />
  </div>
</template>


<script>
import share from '~/components/share'

export default {
  props: {
    goodsInfoCommissonPrice: {
      type: Number,
    },
    goodsInfoCommissonPriceTips: {
      type: String,
    },
    shareTips: {
      type: String,
    },
  },
  data() {
    return {
      shareshow: false,
      share: {
        url: '',
        title: '',
        description: '',
      },
    }
  },
  methods: {
    onOpenOrShare() {
      if (this.shareTips == 'Open') {
        this.$router.push(this.localeRoute({ name: 'vip' }))
      } else if (this.shareTips == 'Share') {
        this.shareshow = !this.shareshow
      }
    },
  },
  components: {
    share,
  },
}
</script>


<style lang="scss" scoped>
.shop-vip {
  padding: 10px 13px 10px 11px;
  background: #ffffff;
  .vip_box {
    height: 68px;
    padding: 6px 5px 0 5px;
    display: flex;
    justify-content: space-between;
    border-radius: 3px;
    background: #f7d195;
    .left {
      .top {
        display: flex;
        align-items: center;
        .vip_icon_box {
          .vip_icon {
            width: 18px;
            height: 21px;
          }
        }
        .candee_vip {
          margin-left: 5px;
          margin-right: 6px;
          font-size: 14px;
          font-weight: 600;
          color: #735227;
        }
        .tip_message {
          font-size: 9px;
        }
      }
      .bottom {
        margin-top: 13px;
        margin-left: 25px;
        .earns_money {
          color: #fb5056;
        }
      }
    }
    .right {
      position: relative;
      display: flex;
      align-items: center;
      .share_button {
        position: absolute;
        left: 8px;
        color: #ffffff;
      }
      .icon {
        width: 46px;
        height: 46px;
      }
    }
  }
}
</style>