<template>
  <div class="shop-sku">
    <van-popup
      v-model="_showSku"
      :closeable="true"
      close-icon="close"
      round
      position="bottom"
      safe-area-inset-bottom
    >
      <template>
        <div class="shop_sku_box">
          <div class="shop_header_box">
            <div class="header_img_box">
              <img class="shop-img" :src="goodsInfoImgId" />
            </div>
            <div class="shop-info">
              <div class="info-money">{{$t('money')}} {{goodsInfoPreferPrice | money-init}}</div>
              <div class="info-stock">{{$t('sku.stock')}} {{goodsInfoRealStock}}</div>
              <div class="info-spec">{{specName}}</div>
            </div>
          </div>

          <div class="overflow_box">
            <div class="shop_content_box">
              <div class="spu_name" v-for="(item) in spuSpecList" :key="item.specId">
                <div>{{item.specName}}</div>
                <div class="spe_name_box">
                  <div
                    class="spe_name"
                    :class="{'spe_name_color': subItem.selectState}"
                    v-for="(subItem, subIndex) in item.specDetail"
                    :key="subItem.specDetailId"
                    @click="clickSku(subItem,subIndex,item)"
                  >{{subItem.specDetailName}}</div>
                </div>
              </div>
            </div>

            <!-- 选择数量 -->
            <div class="shop-num-box">
              <div class="quantity_box">
                <div class="title">{{$t('sku.quantity')}}</div>
                <div
                  class="message"
                  v-if="isQuantityNum"
                >{{$t('sku.limit.limited')}} {{goodsInfoRealStock}} {{$t('sku.limit.pieces')}}</div>
                <div class="select">
                  <van-stepper v-model.number="_quantityNum" :min="1" :max="goodsInfoRealStock" />
                </div>
              </div>
            </div>
          </div>

          <van-tabbar :safe-area-inset-bottom="true" :placeholder="true" :border="false">
            <div class="shop_footer_box" v-if="skuState === 0 && !showButton">
              <van-button
                class="sku_state_zero"
                round
                color="#f6c433"
                @click="onAddCart"
              >{{$t('sku.add-cart')}}</van-button>
              <van-button
                class="sku_state_zero"
                round
                color="#e84a52"
                @click="onNowBuy"
              >{{$t('sku.buy-now')}}</van-button>
            </div>
            <div class="shop_footer_box" v-if="skuState === 0 && showButton">
              <van-button
                class="sku_state_one"
                v-if="showButton == 'cart'"
                round
                color="#f6c433"
                @click="onAddCart"
              >{{$t('sku.add-cart')}}</van-button>
              <van-button
                class="sku_state_one"
                v-if="showButton == 'buy'"
                round
                color="#e84a52"
                @click="onNowBuy"
              >{{$t('sku.buy-now')}}</van-button>
            </div>
            <div class="shop_footer_box" v-if="skuState === 1">
              <van-button class="failure-button" round color="#c2c2c2">{{$t('sku.failure-button')}}</van-button>
            </div>
            <div class="shop_footer_box" v-if="skuState === 3">
              <van-button class="sold-button" round color="#c2c2c2">{{$t('sku.sold-out')}}</van-button>
            </div>
            <div class="shop_footer_box" v-if="skuState === 4">
              <van-button class="not-button" round color="#c2c2c2">{{$t('sku.not-started')}}</van-button>
            </div>
          </van-tabbar>
        </div>
      </template>
      <slot />
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    showSku: {
      type: Boolean,
      default: false,
    },
    showButton: String,
    quantityNum: {
      type: Number,
      default: 1,
    },
    spuSpecList: {
      type: Array,
      default() {
        return []
      },
    },
    skuState: Number,
    specName: String,
    goodsInfoImgId: String,
    goodsInfoRealStock: Number,
    goodsInfoPreferPrice: Number,
  },
  computed: {
    _showSku: {
      get() {
        return this.showSku
      },
      set(v) {
        return this.$emit('update:showSku', v)
      },
    },
    _quantityNum: {
      get() {
        return this.quantityNum
      },
      set(v) {
        return this.$emit('update:quantityNum', v)
      },
    },
    isQuantityNum() {
      return (
        this.quantityNum >= this.goodsInfoRealStock && this.goodsInfoRealStock
      )
    },
  },
  methods: {
    onNowBuy() {
      this.$emit('click-new-buy')
    },
    onAddCart() {
      this.$emit('click-add-cart')
    },
    clickSku(currentItem, currentIndex, item) {
      item.specDetail.forEach((item, i) => {
        if (i != currentIndex) {
          this.$set(item, 'selectState', false)
        }
      })
      currentItem.selectState = !currentItem.selectState

      // 处理 合并字符
      // 第一中方式
      //   const spec = this.spuSpecList.reduce((prev, next) => {
      //     console.log(prev)
      //     let curSpec = next.specDetail.reduce((a, b) => {
      //       let result = a
      //       if (b.selectState) {
      //         result += `${next.specId}:${b.specDetailId};`
      //       }
      //       return result
      //     }, '')
      //     console.log(curSpec)
      //     return (prev += curSpec)
      //   })
      //   console.log(spec)
      //   console.log(newSpuSpecList)

      // 第二种方式
      const resultList = []
      this.spuSpecList.forEach((item) => {
        const specDetail = item.specDetail.find((v) => v.selectState)
        const specDetailId = specDetail ? specDetail.specDetailId : ''

        if (specDetailId) {
          resultList.push(`${item.specId}:${specDetailId};`)
        } else {
          console.log('取消选中规格')
        }
        // else {
        //   //   this.$toast(this.$t('sku.tip-spec'))
        // }
      })
      const specString = resultList.join('')
      console.log(specString)
      this.$emit('on-spe-method', specString)
    },
  },
}
</script>


<style lang="scss" scoped>
.shop-sku {
  ::v-deep .van-popup {
    .van-icon-close {
      font-size: 18px;
      color: #333333;
    }
    .shop_sku_box {
      padding: 20px 16px 20px 18px;
      .shop_header_box {
        width: 100%;
        height: 100px;
        display: flex;
        padding-bottom: 30px;
        border-bottom: 1px solid #e8e5e8;
        background: #ffffff;
        .header_img_box {
          width: 100px;
          height: 100px;
          .shop-img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
        .shop-info {
          flex: 1;
          padding: 17px 0 0 11px;
          .info-money {
            font-size: 18px;
            color: #e84a51;
          }
          .info-stock {
            margin-top: 14px;
            font-size: 12px;
            color: #666666;
          }
          .info-spec {
            margin-top: 14px;
          }
        }
      }
      .overflow_box {
        width: 100%;
        max-height: 260px;
        padding-bottom: 10px;
        overflow: hidden;
        overflow: auto;
        /*适应苹果*/
        -webkit-overflow-scrolling: touch;
        .shop_content_box {
          .spu_name {
            margin-top: 20px;
            padding-bottom: 30px;
            font-size: 15px;
            font-weight: 600;
            border-bottom: 1px solid #edeaed;
          }
          .spe_name_box {
            display: flex;
            flex-wrap: wrap;
            .spe_name {
              margin: 15px 10px 0 0;
              padding: 4px 13px;
              font-size: 12px;
              border-radius: 15px;
              color: #000000;
              background: #f4f1f4;
            }
            .spe_name_color {
              margin: 15px 10px 0 0;
              padding: 3px 12px;
              font-size: 12px;
              border-radius: 15px;
              border: 1px solid #e84a51;
              color: #e84a51;
              background: #fdd1d2;
            }
          }
        }
        .shop-num-box {
          margin-top: 21px;
          .quantity_box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title {
              font-size: 15px;
              font-weight: 600;
            }
            .message {
              font-size: 13px;
              color: #e84a51;
            }
          }
        }
      }
      /*隐藏掉滚动条*/
      .overflow_box::-webkit-scrollbar {
        display: none;
      }
      .van-tabbar {
        display: flex;
        align-items: center;
        .shop_footer_box {
          width: 100%;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .sku_state_zero {
            width: 141px;
            height: 39px;
          }
          .sku_state_one {
            width: 100%;
            height: 39px;
          }
          .failure-button {
            width: 100%;
            height: 44px;
          }
          .sold-button {
            width: 100%;
            height: 44px;
          }
          .not-button {
            width: 100%;
            height: 44px;
          }
        }
      }
    }
  }
}
</style>
