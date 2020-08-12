<template>
  <div class="addAndEditAddress">
    <div class="add-edit-box">
      <div class="van-address-edit">
        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label">
            <span>{{$t('address.receiver')}}</span>
          </div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body">
              <input
                class="van-field__control my_field__control_one"
                type="text"
                :placeholder="$t('address.tips.name')"
                v-model="_userName"
                @input="onName"
              />
            </div>
            <div class="my_error-message" v-if="nameError">{{$t('address.tips.name')}}</div>
          </div>
        </div>

        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label">
            <span>{{$t('address.telephone')}}</span>
          </div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body">
              <input
                class="van-field__control my_field__control_one"
                type="text"
                :placeholder="$t('address.tips.phone')"
                v-model.trim="_phone"
                @input="onPhone"
              />
            </div>
            <div class="my_error-message" v-if="phoneError">{{$t('address.tips.phone')}}</div>
          </div>
        </div>

        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label">
            <span>{{$t('address.region')}}</span>
          </div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body" @click="onSelect">
              <input
                type="text"
                onfocus="this.blur()"
                :placeholder="$t('address.tips.area')"
                class="van-field__control my_field__control_one"
                v-model="_region"
              />
              <i class="iconfont icon-jinru"></i>
            </div>
            <div class="my_error-message" v-if="regionError">{{$t('address.tips.area')}}</div>
          </div>
        </div>

        <div class="van-cell van-field">
          <div class="van-cell__title van-field__label">
            <span>{{$t('address.street-address')}}</span>
          </div>
          <div class="van-cell__value van-field__value">
            <div class="van-field__body">
              <input
                class="van-field__control my_field__control_one"
                type="text"
                :placeholder="$t('address.tips.set-address')"
                v-model="_userStreetAddress"
                @input="onStreetAddress"
              />
            </div>
            <div
              class="my_error-message"
              v-if="streetAddressError"
            >{{$t('address.tips.set-address')}}</div>
          </div>
        </div>

        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import {
  validUserName,
  validNoValue,
  validPhonetow,
} from '~/assets/utils/validate'
export default {
  props: {
    userName: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    region: {
      type: String,
      default: '',
    },
    userStreetAddress: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      nameError: false,
      phoneError: false,
      regionError: false,
      streetAddressError: false,
    }
  },
  computed: {
    _userName: {
      get() {
        return this.userName
      },
      set(v) {
        this.nameError = !validUserName(v)
        return this.$emit('update:userName', v)
      },
    },
    _phone: {
      get() {
        return this.phone
      },
      set(v) {
        this.phoneError = !validPhonetow(v)
        return this.$emit('update:phone', v)
      },
    },
    _region: {
      get() {
        return this.region
      },
      set(v) {
        return this.$emit('update:region', v)
      },
    },
    _userStreetAddress: {
      get() {
        return this.userStreetAddress
      },
      set(v) {
        this.streetAddressError = validNoValue(v)
        return this.$emit('update:userStreetAddress', v)
      },
    },
  },
  methods: {
    onName(params) {
      // console.log(params.data)
      // this.nameError = !validUserName(this.userName)
    },
    onPhone(params) {
      // console.log(params.data)
      // this.phoneError = validPhonetow(this.phone)
    },
    onSelect() {
      this.regionError = false
      // console.log('这是组件')
      this.$emit('click-region')
    },
    onStreetAddress(params) {
      // console.log(params.data)
      //   this.streetAddressError = validNoValue(this.userStreetAddress)
    },
  },
}
</script>

<style lang="scss" scoped>
.addAndEditAddress {
  .add-edit-box {
    .van-address-edit {
      padding: 0;
      .van-cell {
        margin-bottom: 24px;
        padding: 0;
        padding-bottom: 8px;
        border-bottom: 1px solid #f7f7f7;
      }
      .van-field {
        &:after {
          display: none;
        }
        .van-field__label {
          width: 113px;
        }
        .van-field__value {
          .my_error-message {
            text-align: left;
            font-size: 10px;
            color: #ee0a24;
          }
        }
      }
    }
  }
}
</style>