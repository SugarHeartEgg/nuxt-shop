<template>
  <div class="user_message">
    <div class="user_phone">
      <div class="area_code">
        <div class="son_code" @click="onShowAreaCode">
          <div class="son_code_left">+{{countryNum}}</div>
          <div class="son_code_right">
            <i class="iconfont icon-xiala"></i>
            <i class="small_color"></i>
          </div>
        </div>
      </div>
      <van-field
        class="phone_input iconfont"
        type="tel"
        maxlength="11"
        icon-prefix="icon"
        v-model="phone"
        :right-icon="phoneChange"
        :placeholder="$t('mine.login-tip.phone-message')"
        @input="blurPhone"
      />
    </div>
    <div class="phone_error_message" v-if="!isShowAreaCode && showPhoneError">
      <div class="content">{{$t('mine.login-tip.phone-number')}}</div>
    </div>

    <div class="user_code" v-if="!isShowAreaCode">
      <van-field
        class="code_input iconfont"
        type="number"
        maxlength="6"
        icon-prefix="icon"
        :placeholder="$t('mine.login-tip.code-message')"
        v-model="password"
        :right-icon="codeChange"
        @input="changePassword"
      />
      <van-button
        v-if="showSend"
        :disabled="phoneNum"
        class="code_button"
        plain
        hairline
        :color="codeButton"
        @click="onSendCode"
      >{{$t('mine.login-tip.send')}}</van-button>
      <van-count-down
        v-show="!showSend"
        class="time_button"
        format="sss"
        ref="countDown"
        :time="120000"
        :auto-start="false"
        @finish="finished"
      />
    </div>
    <div class="code_error_message" v-if="!isShowAreaCode && resultCode">
      <div class="content">{{$t('mine.login-tip.code-number')}}</div>
    </div>

    <div class="footer" v-if="!isShowAreaCode">
      <van-button
        v-if="isShowLogin"
        :disabled="buttonDisabled"
        :class="[buttonDisabled ? 'no_button':'yes_button' ]"
        @click="onLogin"
      >{{$t('mine.login-tip.login-button')}}</van-button>
      <van-button
        v-if="isShowConfirm"
        :disabled="buttonDisabled"
        :class="[buttonDisabled ? 'no_button':'yes_button']"
        @click="onConfirm"
      >{{$t('mine.login-tip.bind-button')}}</van-button>
    </div>

    <div class="select_area_code" v-if="isShowAreaCode">
      <select-area-code @emitAreaCode="changeAreaCode"></select-area-code>
    </div>
  </div>
</template>

<script>
import selectAreaCode from './selectAreaCode'
import { validPhone } from '~/assets/utils/validate'
import { Toast } from 'vant'
export default {
  components: {
    selectAreaCode
  },
  props: {
    isShowLogin: {
      type: Boolean,
      default: false
    },
    isShowConfirm: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // $route
      userId: this.$route.params.userId, // facebookId or googleId
      userInfo: this.$route.params.userInfo, // facebook and googleId detail

      phone: '',
      password: '',
      countryNum: '60',

      isShowAreaCode: false, // 显示 选择 国区号
      showPhoneError: false, // 显示 phone_error_message
      showSend: true, // 显示 倒计时
      resultCode: false // 自定义 字段 用来判断 验证码验证失败时使用
    }
  },
  computed: {
    // placeholdermessage() {
    //   if (this.countryNum == '60') {
    //     return 'e.g. 010 999 9999'
    //   } else if (this.countryNum == '86') {
    //     return 'Phone Number'
    //   }
    // },
    phoneChange() {
      if (this.phone.length < 9) {
        return ''
      } else {
        if (
          validPhone({
            phone: this.phone,
            countryNum: this.countryNum
          })
        ) {
          return 'zhengque'
        } else {
          return 'jinggao'
        }
      }
    },
    codeChange() {
      if (this.password.length == 6 && !this.resultCode) {
        return 'zhengque'
      } else if (this.resultCode) {
        return 'jinggao'
      }
    },
    phoneNum() {
      return !validPhone({
        phone: this.phone,
        countryNum: this.countryNum
      })
    },
    codeButton() {
      if (this.phoneNum) {
        return '#999999'
      } else {
        return '#e84a52'
      }
    },
    buttonDisabled() {
      if (
        validPhone({
          phone: this.phone,
          countryNum: this.countryNum
        }) &&
        this.password.length == 6
      ) {
        return false
      } else {
        return true
      }
    }
  },
  created() {},
  methods: {
    async onLogin() {
      const result = await this.$axios.$post(
        'customer-service/customer/login',
        {
          username: this.phone,
          password: this.password
        }
      )
      if (result.code == 500) {
        this.resultCode = true
        Toast(result.message)
      } else {
        this.$cookies.set('token', result.token)
        this.$router.replace(
          this.localeRoute({
            name: 'home'
          })
        )
      }
    },
    async onConfirm() {
      const result = await this.$axios.$post(
        'customer-service/customer/login',
        {
          username: this.phone,
          password: this.password,
          facebookId: this.userId.facebookId || '',
          googleId: this.userId.googleId || '',
          nickname: this.userInfo.userNick || '',
          photo: this.userInfo.userPhoto || ''
        }
      )
      console.log(result)
      if (result.code == 500) {
        Toast(result.message)
      } else {
        Toast({
          message: 'Registration\nSuccess',
          className: 'iconfont',
          iconPrefix: 'icon',
          icon: 'wancheng'
        })
        this.$cookies.set('token', result.token)
        this.$router.replace({ name: 'home' })
      }
    },
    async onSendCode() {
      let result = await this.$axios.$post(
        'customer-service/customer/sendPhoneCode',
        {
          phone: this.phone
        }
      )
      this.showSend = false
      this.$refs.countDown.start()
    },

    onShowAreaCode() {
      this.isShowAreaCode = true
    },
    changeAreaCode(AreaValue) {
      this.phone = ''
      this.countryNum = AreaValue.value
      this.isShowAreaCode = false
      this.showPhoneError = false
    },
    blurPhone() {
      // 手机号验证
      if (this.phone.length < 9) {
        this.showPhoneError = false
      } else {
        if (
          validPhone({
            phone: this.phone,
            countryNum: this.countryNum
          })
        ) {
          this.showPhoneError = false
        } else {
          this.showPhoneError = true
        }
      }
    },
    changePassword() {
      this.resultCode = false
    },
    finished() {
      this.showSend = true
      this.$refs.countDown.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
.user_message {
  padding: 30px 37px;
  .user_phone {
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #9a9a9a;
    .area_code {
      .son_code {
        display: flex;
        align-items: center;
        .son_code_left {
          font-size: 19px;
          margin-right: 3px;
        }
        .son_code_right {
          display: flex;
          align-items: center;
          position: relative;
          .icon-xiala {
            font-size: 13px;
            margin-right: 5px;
          }
          .small_color {
            content: '';
            width: 2px;
            height: 16px;
            position: absolute;
            right: 0;
            background: #9a9a9a;
          }
        }
      }
    }
    .phone_input {
      margin: 0;
      padding: 0;
      padding-left: 10px;
      // font-size: 19px;
      ::v-deep .van-cell__value {
        .van-field__body {
          .van-field__right-icon {
            .icon-jinggao {
              font-size: 20px;
              color: #e94950;
            }
            .icon-zhengque {
              font-size: 20px;
              color: #84d082;
            }
          }
        }
      }
    }
  }
  .phone_error_message {
    width: 100%;
    height: 15px;
    margin: 5px 8px;
    .content {
      font-size: 13px;
      color: #e84a52;
    }
  }

  .user_code {
    margin-top: 30px;
    padding-bottom: 5px;
    display: flex;
    align-items: flex-end;
    border-bottom: 1px solid #9a9a9a;
    .code_input {
      flex: 1;
      margin: 0;
      padding: 0;
      &:after {
        content: none;
      }

      ::v-deep .van-cell__value {
        .van-field__body {
          .van-field__right-icon {
            .icon-jinggao {
              font-size: 20px;
              color: #e94950;
            }
            .icon-zhengque {
              font-size: 20px;
              color: #84d082;
            }
          }
        }
      }
    }
    .code_button {
      width: 83px;
      height: 39px;
      margin: 0;
      font-size: 19px;
    }
    .time_button {
      width: 83px;
      height: 39px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 19px;
      border: 1px solid #c7c7c7;
      border-radius: 5px;
      color: #999999;
    }
  }
  .code_error_message {
    width: 100%;
    height: 15px;
    margin: 10px 10px;
    .content {
      font-size: 13px;
      color: #e84a52;
    }
  }

  .footer {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    width: 264px;
    height: 49px;
    border-radius: 5px;
    box-shadow: #cbcdd2 0px 0px 3px;
    .yes_button {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      color: #ffffff;
      background: #e84a51;
      border-radius: 5px;
    }
    .no_button {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      color: #666666;
      background: #aaaaaa;
      border-radius: 5px;
    }
  }
}
</style>