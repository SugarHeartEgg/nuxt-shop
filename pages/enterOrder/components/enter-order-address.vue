<template>
  <div class="order-index">
    <div class="class_img_box">
      <div class="bgc"></div>
      <div class="address_box">
        <div class="address_add_select" @click="onAddress">
          <div class="address-exist" v-if="_addressData">
            <div class="content">
              <div class="left">
                <div class="user-info">
                  <div class="name">{{addressData.addressName}}</div>
                  <div class="phone">{{addressData.addressPhone}}</div>
                </div>
                <div class="detail">{{addressData.stateCity}}{{addressData.addressDetail}}</div>
              </div>
              <div class="icon-right">
                <i class="iconfont icon-jinru"></i>
              </div>
            </div>
          </div>
          <div class="address-not-exist" v-else>
            <div class="icon-left">
              <i class="iconfont icon-jiahao"></i>
            </div>
            <div class="tip-address-message">{{$t('enter-order.address.not-exist')}}</div>
            <div class="icon-right">
              <i class="iconfont icon-jinru"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addressData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    _addressData() {
      return this.addressData.defaultState
    },
  },
  methods: {
    onAddress() {
      this.$emit('click-address')
    },
  },
}
</script>

<style lang="scss" scoped>
.order-index {
  .class_img_box {
    width: 100%;
    height: 95px;
    position: relative;
    .bgc {
      width: 100%;
      height: 40px;
      position: absolute;
      background: #e84a54;
    }
    .address_box {
      position: absolute;
      top: 15px;
      right: 0;
      bottom: 0;
      left: 0;
      padding: 0 11px;
      .address_add_select {
        height: 80px;
        border-radius: 10px;
        background: #ffffff;
        .address-exist {
          padding: 14px 26px 16px 26px;
          .content {
            display: flex;
            align-items: center;
            .left {
              .user-info {
                display: flex;
                align-items: center;
                .name {
                  margin-right: 14px;
                  font-size: 15px;
                  font-weight: 600;
                }
                .phone {
                  font-size: 15px;
                  font-weight: 600;
                }
              }
              .detail {
                margin-top: 5px;
                display: -webkit-box;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
              }
            }
            .icon-right {
              padding-left: 63px;
              flex: 1;
            }
          }
        }
        .address-not-exist {
          padding: 29px 20px 19px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .icon-left {
            .icon-jiahao {
              font-size: 32px;
              color: #e0dde0;
            }
          }
          .tip-address-message {
            font-size: 13px;
            color: #999999;
          }
          .icon-right {
            .icon-jinru {
              font-size: 16px;
              color: #999999;
            }
          }
        }
      }
    }
  }
}
</style>