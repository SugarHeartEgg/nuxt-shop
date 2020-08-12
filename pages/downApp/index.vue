<template>
  <div class="down-box">
    <div class="content">
      <div class="back">
        <i class="iconfont icon-fanhui" @click="onBack"></i>
      </div>
      <div class="candee_image_box">
        <img class="candee_image" src="~assets/images/downApp/down_top.png" />
      </div>
      <div class="candee_icon_box">
        <img class="candee_icon" src="~assets/images/downApp/down_icon.png" />
      </div>
      <div class="footer">
        <a href="http://candee.qiushicx.com/mobile/app-release.apk">
          <van-button color="#fc4557" round type="primary">{{$t('downloadapp.text')}}</van-button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'newtam',
  methods: {
    onBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.down-box {
  min-height: 100vh;
  .content {
    width: 100%;
    position: relative;
    .back {
      padding: 10px;
      position: absolute;
      top: 10px;
      .icon-fanhui {
        font-size: 25px;
        color: #ffffff;
      }
    }
    .candee_image_box {
      .candee_image {
        width: 100%;
        height: 338px;
      }
    }
    .candee_icon_box {
      display: flex;
      justify-content: center;
      .candee_icon {
        width: 172px;
        height: 172px;
      }
    }
    .footer {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      ::v-deep .van-button {
        height: 36px;
      }
    }
  }
}
</style>