<template>
  <div class="unavailable-list">
    <div class="unavailable-box">
      <van-checkbox-group disabled>
        <van-swipe-cell v-for="(items) in cartSkuExpiredList" :key="items.goodsInfoId">
          <div class="info">
            <div class="info-content">
              <div class="left">
                <van-checkbox disabled :name="items.cartId"></van-checkbox>
              </div>
              <div class="disabled_box">
                <img class="shop-img" :src="items.goodsInfoImgId" />
                <div class="right">
                  <div class="text">{{items.goodsInfoName}}</div>
                  <div class="format">{{items.specName}}</div>
                  <div class="money-num">
                    <div class="money">{{$t('money')}}{{items.goodsInfoPreferPrice | money-init}}</div>
                    <div class="num">
                      <van-stepper
                        disabled
                        v-model="items.goodsNum"
                        min="1"
                        :max="items.goodsInfoPreferPrice"
                        input-width="30px"
                        button-size="18px"
                      />
                    </div>
                  </div>
                </div>
                <div class="disabled_null">{{$t('cart-list.disabled-null')}}</div>
              </div>
            </div>
          </div>
          <template #right>
            <van-button
              :text="$t('cart-list.del')"
              square
              type="danger"
              class="delete-button"
              @click="onDel(items.cartId)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartSkuExpiredList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {

  },
  methods: {
    onDel(cartId) {
      this.$emit('click-delete', cartId)
    },
  },
}
</script>

<style lang="scss" scoped>
.unavailable-list {
  .unavailable-box {
    .info {
      width: 100%;
      height: 100%;
      .info-content {
        display: flex;
        .left {
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
        .disabled_box {
          width: 100%;
          display: flex;
          position: relative;
          .shop-img {
            width: 100px;
            height: 100px;
            border-radius: 10px;
          }
          .right {
            width: 100%;
            margin-left: 10px;
            .text {
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .format {
              display: inline-block;
              margin-top: 14px;
              padding: 4px 12px;
              background: #f4f1f4;
            }
            .money-num {
              margin-top: 19px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              .money {
                color: #e84a51;
              }
              .num {
                ::v-deep .van-stepper {
                  .van-stepper__minus {
                    background: #ffffff;
                  }
                  .van-stepper__plus {
                    background: #ffffff;
                  }
                }
              }
            }
          }
          .disabled_null {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: 600;
            opacity: 0.7;
            border-radius: 10px;
            color: #ffffff;
            background: #808080;
          }
        }
      }
    }

    .delete-button {
      height: 100%;
      border: 0;
    }
  }
}
</style>