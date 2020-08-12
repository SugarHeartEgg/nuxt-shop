<template>
  <div class="shop-address">
    <div class="address_box">
      <div class="address_header" @click="onShowAddress">
        <div class="text">{{$t('shop.delivery.delivery-text')}}</div>
        <div class="right_icon">
          <span class="address_money">{{computeFreight.freight}}</span>
          <i class="iconfont icon-jinru"></i>
        </div>
      </div>

      <div class="address_message">
        <div class="address_icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dizhi" />
          </svg>
        </div>
        <div
          class="address_detalil"
          v-if="isToken && computeFreight.addressDetail"
        >{{computeFreight.addressDetail}}</div>
        <div class="address_detalil" v-else>{{$t('shop.delivery.address')}}</div>
      </div>

      <div class="tip_message">（{{deliveryDay}}）</div>

      <div class="address_free">
        <div class="free_icon">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huodaofukuan" />
          </svg>
        </div>
        <div class="free_detalil">{{$t('shop.delivery.free')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    computeFreight: {
      type: Object
    },
    deliveryDay: {
      type: String
    }
  },
  data() {
    return {
      isToken: this.$cookies.get('token')
    }
  },
  methods: {
    onShowAddress() {
      this.$emit('click-showAddress')
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-address {
  height: 114px;
  padding: 10px 13px 0 11px;
  margin-top: 10px;
  background: #ffffff;
  .address_box {
    .address_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .text {
        font-size: 15px;
        font-weight: 600;
      }
      .right_icon {
        .icon-jinru {
          font-size: 11px;
        }
      }
    }
    .address_message {
      margin-top: 6px;
      display: flex;
      align-items: center;
      .address_icon {
        .icon {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
      }
      .address_detalil {
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .tip_message {
      margin: 5px 0 0 24px;
      font-size: 14px;
    }
    .address_free {
      margin-top: 12px;
      display: flex;
      align-items: center;
      .free_icon {
        .icon {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
      }
      .free_detalil {
        font-size: 14px;
      }
    }
  }
}
</style>