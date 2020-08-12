<template>
  <div class="my_address">
    <van-overlay :show="showAddress">
      <div class="wrapper">
        <div class="block">
          <div class="block-img">
            <img :src="bgimg" />
          </div>
          <div class="content">{{$t('my-address.content')}}</div>
          <div class="set-up">
            <van-button color="#e94950" round @click="onSetUp">{{$t('my-address.set-up')}}</van-button>
          </div>
          <div class="not-set" @click="onShow">{{$t('my-address.not-set')}}</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import img from '~/assets/images/address/add1.png'
export default {
  props: {
    showAddress: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      bgimg: img,
    }
  },
  methods: {
    onSetUp() {
      this.$emit('click-set')
    },
    onShow() {
      this.$emit('click-show')
    },
  },
}
</script>

<style lang="scss" scoped>
.my_address {
  ::v-deep .van-overlay {
    z-index: 99;
  }
  .wrapper {
    padding: 0 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block {
      width: 100%;
      height: 278px;
      padding: 0 38px;
      text-align: center;
      border-radius: 10px;
      background-color: #f2f2f2;
      .block-img {
        margin-top: -41px;
      }
      .content {
        margin-top: 21px;
      }
      .set-up {
        ::v-deep .van-button {
          width: 203px;
          height: 40px;
          margin-top: 34px;
        }
      }
      .not-set {
        margin-top: 12px;
        font-size: 13px;
        color: #e84a51;
      }
    }
  }
}
</style>