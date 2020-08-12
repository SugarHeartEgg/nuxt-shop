<template>
  <div class="address-box">
    <div class="address-header">
      <van-nav-bar
        :title="$t('address.list-title')"
        :border="false"
        left-arrow
        fixed
        placeholder
        @click-left="onClickLeft"
      />
    </div>

    <div
      class="address-content-box"
      v-for="item in addressData"
      :key="item.addressId"
      @click="onDefault(item)"
    >
      <div class="header">
        <div>{{item.addressName}}</div>
        <div>{{item.addressPhone}}</div>
      </div>
      <div class="detail">
        <div class="message">
          <span class="tips" v-if="item.defaultState">{{$t('address.list-default-icon')}}</span>
          {{item.stateCity}}{{item.addressDetail}}
        </div>
      </div>
      <div class="radio">
        <div>
          <van-radio-group
            v-model="item.defaultState"
            direction="horizontal"
            checked-color="#f64f66"
          >
            <van-radio :name="true">{{$t('address.list-default-text')}}</van-radio>
          </van-radio-group>
        </div>
        <div class="icon_box" @click.stop="onEditAddres(item)">
          <i class="iconfont icon-xiugai-copy"></i>
        </div>
      </div>
    </div>

    <div class="footer-box">
      <van-tabbar :safe-area-inset-bottom="true" :placeholder="true">
        <template>
          <div class="footer-button">
            <van-button color="#e94950" round @click="onAddress">{{$t('address.new-button')}}</van-button>
          </div>
        </template>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import {
  getAddressLit,
  updateDefault,
} from '~/assets/utils/api/address/api-serve'
export default {
  layout: 'newtam',
  name: 'myAddress',
  data() {
    return {
      addressData: [],
    }
  },
  created() {
    this.getAddressData()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onAddress() {
      this.$router.push(
        this.localeRoute({
          name: 'address-editAddress',
        })
      )
    },
    onEditAddres(addressItem) {
      this.$router.push(
        this.localeRoute({
          name: 'address-editAddress',
          query: {
            addressId: addressItem.addressId,
          },
        })
      )
    },
    async onDefault(item) {
      const response = await updateDefault(
        {
          $axios: this.$axios,
        },
        {
          addressId: item.addressId,
        }
      )
      this.getAddressData()
    },

    async getAddressData() {
      const response = await getAddressLit({
        $axios: this.$axios,
      })
      console.log(response)
      this.addressData = response
    },
  },
}
</script>

<style lang="scss" scoped>
.address-box {
  min-height: 100vh;
  margin-bottom: 20px;
  background: #f7f7f7;
  .address-header {
    ::v-deep .van-nav-bar {
      .van-icon {
        color: #333333;
      }
      .van-nav-bar__title {
        font-weight: 600;
      }
    }
  }
  .address-content-box {
    height: 110px;
    margin-top: 10px;
    padding: 12px 10px;
    border-radius: 10px;
    background: #ffffff;
    .header {
      height: 24px;
      padding-bottom: 6px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      border-bottom: 1px solid #eeeeee;
    }
    .detail {
      margin-top: 13px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eeeeee;
      .message {
        line-height: 24px;
        font-size: 13px;
        font-weight: 600;
        display: -webkit-box;
        text-overflow: ellipsis;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        .tips {
          padding: 2px 4px;
          border-radius: 3px;
          color: #ffffff;
          background: #e84a51;
        }
      }
    }
    .radio {
      margin-top: 9px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      font-weight: 600;
      .icon_box {
        width: 50px;
        display: flex;
        justify-content: flex-end;
        .icon-xiugai-copy {
          font-size: 17px;
        }
      }
    }
  }
  .footer-box {
    ::v-deep .van-tabbar {
      height: 61px;
      background: #f7f7f7;
      .footer-button {
        width: 100%;
        padding: 0 46px;
        display: flex;
        justify-content: center;
        .van-button {
          width: 100%;
          margin-bottom: 10px;
          font-size: 15px;
        }
      }
    }
  }
}
</style>