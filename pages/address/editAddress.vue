<template>
  <div class="edit-address">
    <div class="edit-header">
      <van-nav-bar
        :title="$t('address.title')"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>

    <div class="add-edit-content">
      <addAnd-edit-address
        :userName.sync="userName"
        :phone.sync="phone"
        :region.sync="region"
        :userStreetAddress.sync="userStreetAddress"
        @click-region="changeRehion"
      ></addAnd-edit-address>
    </div>

    <div class="add-edit-default">
      <radio-default :setDefault.sync="setDefault" />
    </div>

    <div class="add-edit-footer">
      <van-button color="#ea4954" round @click="onSaveUse">{{$t('address.save-button')}}</van-button>
    </div>

    <address-list
      :showSelectBox.sync="showSelectBox"
      :activeName.sync="activeName"
      :addressProvincies="addressProvincies"
      :addressCities="addressCities"
      :postcode="postcode"
      @click-state="changeState"
      @click-city="changeCoty"
      @click-postcode="changePostcode"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import addAndEditAddress from '~/components/addAndEditAddress'
import radioDefault from '~/components/addAndEditAddress/radioDefault'
import addressList from '~/components/addressList'

import {
  getStateData,
  getCityData,
  getPostCodeData,
  addOrEditAddress,
  getUserAddress,
} from '~/assets/utils/api/address/api-serve'
export default {
  layout: 'newtam',
  name: 'myEditAddress',
  data() {
    return {
      userName: '',
      phone: '',
      region: '',
      userStreetAddress: '',
      setDefault: 0,
      showSelectBox: false,

      addressId: this.$route.query.addressId || null, // 编辑地址时，需要当前修改的唯一id

      provinceName: '',
      cityName: '',
      postCodeName: '',
      postcodeId: null, // 邮编id
      activeName: 'a', // 选择地址tab
      stateCity: [], // 省,市,邮编(选择后的地址id的拼接)
      addressProvincies: [], // 省 data
      addressCities: [], //  市 data
      postcode: [], // 邮编 data
    }
  },
  created() {
    if (this.addressId) {
      this.getAddressInfo()
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },

    // 选择地址
    changeRehion() {
      this.showSelectBox = !this.showSelectBox
      // this.addressProvincies = []
      // this.addressCities = []
      // this.postcode = []

      this.getState()
    },
    changeState(res) {
      const provinceId = res.provinceId

      this.provinceName = res.provinceName
      this.getCity(provinceId)
      this.stateCity[0] = provinceId
      this.activeName = 'b'
    },
    async changeCoty(res) {
      const cityId = res.cityId

      this.cityName = res.cityName
      await this.getPostCode(cityId)
      if (this.postcode.length != 0) {
        this.activeName = 'c'
        this.stateCity[1] = cityId
      } else {
        this.stateCity[1] = cityId
      }
    },
    changePostcode(res) {
      const postcodeId = res.postcodeId
      this.postcodeId = postcodeId

      this.postCodeName = res.postcodeName
      this.stateCity[2] = postcodeId

      this.region = `${this.provinceName},${this.cityName},${this.postCodeName}`
      this.showSelectBox = !this.showSelectBox
    },
    // 选择地址 End

    initErrorMessage() {
      let flag
      if (
        this.userName &&
        this.phone &&
        this.region &&
        this.userStreetAddress
      ) {
        flag = true
      }
      return flag
    },

    onSaveUse: debounce(async function () {
      const _this = this
      if (!_this.initErrorMessage()) return // 四个信息都填了，才能过

      const mergeAddress = `${_this.provinceName},${_this.cityName},${_this.postCodeName}`
      const response = await addOrEditAddress(
        { $axios: _this.$axios },
        {
          addressId: _this.addressId,
          addressName: _this.userName,
          addressPhone: _this.phone,
          myId: _this.postcodeId,
          stateCity: mergeAddress,
          addressDetail: _this.userStreetAddress,
          defaultState: _this.setDefault,
        }
      )
      _this.$toast.success(_this.$t('address.add-success'))
      _this.$router.go(-1)
    }, 800),

    async getState() {
      const resultState = await getStateData({
        $axios: this.$axios,
      })
      this.addressProvincies = resultState
    },
    async getCity(provinceId) {
      const resultCities = await getCityData(
        {
          $axios: this.$axios,
        },
        {
          provinceId,
        }
      )
      this.addressCities = resultCities
    },
    async getPostCode(cityId) {
      const resultPostCode = await getPostCodeData(
        {
          $axios: this.$axios,
        },
        {
          cityId,
        }
      )
      this.postcode = resultPostCode
    },

    async getAddressInfo() {
      const response = await getUserAddress(
        {
          $axios: this.$axios,
        },
        {
          addressId: this.addressId,
        }
      )
      console.log(response)
      this.userName = response.addressName
      this.phone = response.addressPhone
      this.region = response.stateCity
      this.userStreetAddress = response.addressDetail
      if (response.defaultState) {
        this.setDefault = 1
      } else {
        this.setDefault = 0
      }
    },
  },
  components: {
    addAndEditAddress,
    addressList,
    radioDefault,
  },
}
</script>

<style lang="scss" scoped>
.edit-address {
  min-height: 100vh;
  position: relative;
  background: #f7f7f7;
  .edit-header {
    ::v-deep .van-nav-bar {
      .van-nav-bar__left {
        padding-left: 10px;
        .van-icon {
          color: #333333;
        }
      }
      .van-nav-bar__title {
        font-weight: 600;
      }
    }
  }
  .add-edit-content {
    margin-top: 10px;
    padding: 16px 9px 2px 10px;
    background: #ffffff;
  }
  .add-edit-default {
    padding: 0 9px 0 10px;
    margin-top: 10px;
    background: #ffffff;
  }
  .add-edit-footer {
    width: 100%;
    position: absolute;
    bottom: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    ::v-deep .van-button {
      width: 268px;
      height: 43px;
    }
  }
}
</style>