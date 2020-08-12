<template>
  <div class="shop-tabbar">
    <van-tabbar :placeholder="true" :safe-area-inset-bottom="true">
      <van-goods-action>
        <van-goods-action-icon :text="$t('shop.shop-tabbar.chat')" @click="onChat">
          <template #icon>
            <i class="iconfont icon-tiaozhuankefu"></i>
          </template>
        </van-goods-action-icon>
        <van-goods-action-icon
          :text="$t('shop.shop-tabbar.cart')"
          :badge="cartCount"
          @click="onCart"
        >
          <template #icon>
            <i class="iconfont icon-gouwuchexianxing"></i>
          </template>
        </van-goods-action-icon>
        <template>
          <div class="shop-tabbar-button">
            <van-button
              v-if="skuState === 0"
              class="add-button"
              round
              color="#f5c532"
              @click="eventsAdd"
            >{{$t('shop.shop-tabbar.add-button')}}</van-button>
            <van-button
              v-if="skuState === 0"
              class="buy-button"
              round
              color="#fc3549"
              @click="eventsBuy"
            >{{$t('shop.shop-tabbar.buy-button')}}</van-button>

            <van-button
              v-if="skuState === 1"
              class="not-button"
              round
              color="#c2c2c2"
            >{{$t('shop.shop-tabbar.failure-button')}}</van-button>
            <van-button
              v-if="skuState === 3"
              class="not-button"
              round
              color="#c2c2c2"
            >{{$t('shop.shop-tabbar.out-button')}}</van-button>
            <van-button
              v-if="skuState === 4"
              class="not-button"
              round
              color="#c2c2c2"
            >{{$t('shop.shop-tabbar.not-button')}}</van-button>
          </div>
        </template>
      </van-goods-action>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: {
    skuState: {
      type: Number,
    },
    cartCount: {
      type: Number,
    },
  },
  methods: {
    onChat() {
      this.$emit('click-chat')
    },
    onCart() {
      this.$emit('click-cart')
    },
    eventsAdd() {
      this.$emit('click-add', 'cart')
    },
    eventsBuy() {
      this.$emit('click-buy', 'buy')
    },
  },
}
</script>

<style lang="scss" scoped>
.shop-tabbar {
  ::v-deep .van-tabbar__placeholder {
    .van-hairline--top-bottom {
      .van-goods-action {
        .shop-tabbar-button {
          width: 100%;
          padding: 0 11px 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .add-button {
            width: 108px;
            height: 36px;
          }
          .buy-button {
            width: 108px;
            height: 36px;
          }
          .not-button {
            width: 226px;
            height: 36px;
            .van-button__content {
              .van-button__text {
                font-weight: 600;
                color: #919191;
              }
            }
          }
        }
        .van-goods-action-icon {
          .van-goods-action-icon__icon {
            .icon-tiaozhuankefu {
              font-size: 20px;
            }
            .icon-gouwuchexianxing {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
