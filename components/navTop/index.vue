<template>
  <div class="nav_top">
    <van-sticky>
      <div class="content iconfont" v-if="isShow">
        <van-icon class="clear_icon" name="cross" color="#ffffff" size="15" @click="onClear" />
        <van-image
          class="candee_icon"
          src="data:image/png;base64,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"
        />
        <div class="candee_text">{{$t('navtop.title')}}</div>
        <div class="open_button">
          <van-button
            class="son_button"
            type="primary"
            color="#fc4557"
            block
            @click="toDownPage"
          >{{$t('navtop.righttext')}}</van-button>
        </div>
      </div>
    </van-sticky>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    onClear() {
      this.isShow = false
    },
    toDownPage() {
      this.$router.push(
        this.localeRoute({
          name: 'downApp'
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.nav_top {
  width: 100%;
  z-index: 67;
  .content {
    height: 40px;

    display: flex;
    align-items: center;
    background: #666666;
    .clear_icon {
      margin-left: 12px;
    }
    .candee_icon {
      width: 28px;
      height: 28px;
      margin-left: 12px;
    }
    .candee_text {
      display: flex;
      flex: 1;
      justify-content: center;
      font-size: 12px;
      color: #ffffff;
    }
    .open_button {
      width: 100px;
      height: 100%;
      .son_button {
        width: 100%;
        height: 100%;
        border-radius: 0;
      }
    }
  }
}
</style>