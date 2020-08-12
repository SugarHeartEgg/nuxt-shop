<template>
  <div class="bind_login">
    <div class="bgi_image_box">
      <div class="back_icon_box" @click="onBackPage">
        <i class="back_icon iconfont icon-fanhui"></i>
      </div>
      <div class="bgi_image">
        <img class="son_image" src="~assets/images/login/bind_bgi.png" />
      </div>
    </div>

    <div class="bind_text">
      <div class="content">{{$t('mine.login-tip.bind-message')}}</div>
    </div>

    <div class="user_message">
      <user-message :isShowConfirm="true"></user-message>
    </div>
  </div>
</template>

<script>
import userMessage from './userMessage'

export default {
  layout: 'newtam',
  components: {
    userMessage
  },
  data() {
    return {}
  },
  methods: {
    onBackPage() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.bind_login {
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
        margin-top: 27px;
        width: 220px;
        height: 176px;
      }
    }
  }
  .bind_text {
    display: flex;
    justify-content: center;
    .content {
      margin-top: 10px;
      font-size: 19px;
      color: #ffffff;
    }
  }
  .user_message {
    width: 337px;
    height: 264px;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: #c92b32 0px 0px 10px;
    background: #ffffff;
  }
}
</style>