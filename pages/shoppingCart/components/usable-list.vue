<template>
  <div class="usable-cart">
    <div class="usable-box" v-for="(item) in cartDataList" :key="item.supplierId">
      <div class="header-check" @click="onCheckAll">
        <van-checkbox v-model="_usableChecked" checked-color="#f64f66"></van-checkbox>
        <div class="shop-name">{{item.supplierName}}</div>
        <div class="flash">{{$t('cart-list.shop-info.flash')}}</div>
      </div>

      <van-checkbox-group
        v-model="result"
        ref="checkboxGroup"
        checked-color="#f64f66"
        @change="changecheckgroup"
      >
        <div v-for="(items) in item.cartSkuDTOList" :key="items.goodsInfoId">
          <van-swipe-cell>
            <div class="info">
              <div class="info-flash" v-if="items.type">{{$t('cart-list.shop-info.flash')}}</div>
              <div class="info-content">
                <div class="left">
                  <van-checkbox :name="items.cartId" @click="onCheck(item.cartSkuDTOList)" />
                  <img class="shop-img" :src="items.goodsInfoImgId" />
                </div>
                <div class="right">
                  <div class="text">{{items.goodsInfoName}}</div>
                  <div class="format">{{items.specName}}</div>
                  <div class="money-num">
                    <div class="money">{{$t('money')}}{{items.goodsInfoPreferPrice | money-init}}</div>
                    <div class="num">
                      <van-stepper
                        v-model="items.goodsNum"
                        min="1"
                        :max="items.goodsInfoPreferPrice"
                        input-width="30px"
                        button-size="18px"
                      />
                    </div>
                  </div>
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
        </div>
      </van-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    usableChecked: {
      type: Boolean,
      default: false,
    },
    cartDataList: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      result: [],
    }
  },
  computed: {
    _usableChecked: {
      get() {
        return this.usableChecked
      },
      set(v) {
        return this.$emit('update:usableChecked', v)
      },
    },
  },
  methods: {
    changecheckgroup(e) {
      this.$emit('click-box', e)
    },
    onCheck(cartSkuDTOList, items) {
      if (this.result.length == cartSkuDTOList.length) {
        this.onCheckAll()
      } else {
        this.$emit('update:usableChecked', false)
      }
    },
    onCheckAll() {
      this.$emit('update:usableChecked', !this.usableChecked)
      this.$refs.checkboxGroup[0].toggleAll(!this.usableChecked)
      // this.$emit('click-check', this.result)
    },
    onDel(cartId) {
      console.log(cartId)
      this.$emit('click-delete', cartId)
    },
  },
}
</script>

<style lang="scss" scoped>
.usable-cart {
  .usable-box {
    .header-check {
      display: flex;
      align-items: center;
      .shop-name {
        margin-left: 10px;
        font-size: 16px;
        font-weight: 600;
      }
      .flash {
        margin-left: 10px;
        padding: 4px 5px;
        border-radius: 3px;
        color: #ffffff;
        background: linear-gradient(to right, #ea4952, #fa7678);
      }
    }
    .info {
      margin-top: 15px;
      .info-flash {
        margin: 0 0 3px 30px;
        padding: 4px 5px;
        display: inline-block;
        border-radius: 3px;
        color: #ffffff;
        background: linear-gradient(to right, #ea4952, #fa7678);
      }
      .info-content {
        display: flex;
        .left {
          display: flex;
          align-items: center;
          .shop-img {
            margin-left: 10px;
            width: 100px;
            height: 100px;
            border-radius: 10px;
          }
        }
        .right {
          flex: 1;
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
      }
    }
    .delete-button {
      height: 100%;
      border: 0;
    }
  }
}
</style>