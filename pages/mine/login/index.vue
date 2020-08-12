<template>
  <div class="login">
    <div class="bgi_image_box">
      <div class="back_icon_box" v-if="isBack">
        <i class="back_icon iconfont icon-fanhui" @click="onBack"></i>
      </div>
      <div class="bgi_image">
        <img class="son_image" src="~assets/images/login/login_bgi.png" />
      </div>
    </div>

    <div class="user_message_box">
      <user-message :isShowLogin="true"></user-message>
    </div>

    <div class="divider_box">
      <van-divider
        :style="{ color: '#ffffff', borderColor: '#ffffff', padding: '0 38px' }"
      >{{$t('mine.login-tip.footer-text')}}</van-divider>
    </div>

    <div class="footer">
      <div class="left_button" @click="handleFaceBook">
        <van-image class="left_icon" :src="facebook"></van-image>
        <div class="text">Facebook</div>
      </div>
      <div class="right_button" @click="handleGoogle">
        <van-image class="right_icon" :src="google"></van-image>
        <div class="text">Google</div>
      </div>
    </div>
  </div>
</template>

<script>
import userMessage from './userMessage'

import facebook from '~/assets/images/login/facebook.png'
import google from '~/assets/images/login/google.png'

export default {
  layout: 'newtam',
  components: {
    userMessage
  },
  data() {
    return {
      facebook: facebook, // image 资源
      google: google, // image 资源
      isBack: this.$route.query.isBack || false,

      resultFaceBook: {},
      resultGoogle: {}
    }
  },
  created() {
    this.changeToken()
  },
  mounted() {
    this.$nextTick(() => {
      this.initFaceBook()
      this.initGoogle()
    })
  },
  methods: {
    changeToken() {
      const isToken = this.$cookies.get('token')
      if (isToken) {
        this.$router.replace(this.localeRoute({ name: 'home' }))
      }
    },
    onBack() {
      this.$router.go(-1)
    },
    initFaceBook() {
      ;(function(d, s, id) {
        let js,
          fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
          return
        }
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      })(document, 'script', 'facebook-jssdk')

      window.fbAsyncInit = function() {
        FB.init({
          appId: '1158699791147922',
          xfbml: true,
          cookie: true,
          version: 'v7.0'
        })
        FB.AppEvents.logPageView()
      }
    },
    initGoogle() {
      if (process.client) {
        const gapiScript = document.createElement('script')
        gapiScript.setAttribute('src', 'https://apis.google.com/js/platform.js')
        document.querySelector('head').appendChild(gapiScript)

        gapiScript.onload = () => {
          gapi.load('auth2', () => {
            window.gapi.auth2.init({
              client_id: `744583700522-mqbum182jt8ssrh7e4edm55a4hg7036g.apps.googleusercontent.com`, //客户端ID
              cookiepolicy: 'single_host_origin',
              scope: 'profile', // 可以请求除了默认的'profile' and 'email'之外的数据
              fetch_basic_profile: true
            })
          })
        }
      }
    },
    handleFaceBook() {
      console.log(FB)
      FB.login(
        response => {
          if (response.authResponse) {
            console.log(response)
            // 头像
            const facebookImg =
              'https://graph.facebook.com/' +
              response.authResponse.userID +
              '/picture?access_token=' +
              response.authResponse.accessToken
            console.log(facebookImg)
            FB.api('/me', response => {
              console.log(response)
              this.resultFaceBook.facebookId = response.id
              this.resultFaceBook.userNick = response.name
              this.resultFaceBook.userPhoto = facebookImg
              this.setIsBind(
                this.resultFaceBook.facebookId,
                this.resultFaceBook
              )
            })
          } else {
            console.log('User cancelled login or did not fully authorize.')
          }
        },
        { scope: 'public_profile,email' }
      )
    },
    async handleGoogle() {
      if (process.client) {
        const GoogleAuth = await gapi.auth2.getAuthInstance()
        const response = await GoogleAuth.signIn()
        if (response.Ea) {
          console.log(response)
          this.resultGoogle.googleId = response.Ea
          this.resultGoogle.userPhoto = response.Rt.dL
          this.resultGoogle.userNick = response.Rt.Bd
          this.setIsBind(this.resultGoogle.googleId, this.resultGoogle)
        }
      }
    },
    async setIsBind(id, userInfo) {
      const userIsBind = await this.$axios.$post('/customer/isBind', {
        id
      })

      // 这里这样处理是，绑定页，要把传的id区分开
      let userId = {
        googleId: this.resultGoogle.googleId,
        facebookId: this.resultFaceBook.facebookId
      }
      console.log(userIsBind)

      if (userIsBind.code == 503) {
        this.$router.push({
          name: 'mine-login-bindLogin',
          params: { userInfo, userId }
        })
      } else {
        if (userIsBind.token) {
          this.$cookies.set('token', userIsBind.token)
          this.$router.replace({ name: 'home' })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  min-height: 100vh;
  background: linear-gradient(#e75a60, #e84a51);
  .bgi_image_box {
    .back_icon_box {
      position: relative;
      .back_icon {
        position: absolute;
        top: 6px;
        left: 6px;
        padding: 5px;
        font-size: 21px;
        color: #ffffff;
      }
    }
    .bgi_image {
      display: flex;
      justify-content: center;
      .son_image {
        width: 300px;
        height: 300px;
        margin-top: -60px;
      }
    }
  }
  .user_message_box {
    width: 337px;
    // height: 230px;
    margin: 0 auto;
    margin-top: -12px;
    border-radius: 5px;
    box-shadow: #c92b32 0px 0px 10px;
    background: #ffffff;
  }

  .footer {
    display: flex;
    justify-content: space-evenly;
    .left_button {
      width: 100px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 20px;
      background: #ffffff;
      .left_icon {
        width: 18px;
        height: 18px;
        margin-right: 3px;
      }
      .text {
        font-size: 13px;
        color: #5383ec;
      }
    }
    .right_button {
      width: 100px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 20px;
      background: #ffffff;
      .right_icon {
        width: 18px;
        height: 18px;
        margin-right: 3px;
      }
      .text {
        font-size: 13px;
        color: #5383ec;
      }
    }
  }
}
</style>