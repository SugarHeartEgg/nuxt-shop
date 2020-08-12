<template>
  <div class="shop-header" v-if="_skuImageList">
    <div class="shop_swipe_box">
      <van-nav-bar fixed @click-left="onClickLeft" @click-right="onClickRight">
        <template #left>
          <div class="left_icon">
            <i class="iconfont icon-fanhui-copy"></i>
          </div>
        </template>
        <template #right>
          <div class="right_icon">
            <i class="iconfont icon-fenxiang"></i>
          </div>
        </template>
      </van-nav-bar>
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#fd3549" @change="onChange">
        <van-swipe-item v-for="(item, index) in skuImageList" :key="index">
          <img class="my-swipe-img" :src="item" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{skuImageList.length}}</div>
        </template>
      </van-swipe>
    </div>

    <share :shareshow.sync="shareshow" :share="share" />
  </div>
</template>

<script>
import share from '~/components/share'
export default {
  props: {
    skuImageList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      current: 0,
      shareshow: false,
      share: {
        url: '',
        title: '',
        description: ''
      }
    }
  },
  computed: {
    _skuImageList() {
      return this.skuImageList.length
    }
  },
  methods: {
    onChange(index) {
      this.current = index
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.shareshow = !this.shareshow
    }
  },
  components: {
    share
  }
}
</script>

<style lang="scss" scoped>
.shop-header {
  .shop_swipe_box {
    .my-swipe {
      position: relative;
      .van-swipe-item {
        height: 351px;
        .my-swipe-img {
          width: 100%;
          height: 100%;
        }
      }
      .custom-indicator {
        width: 40px;
        height: 20px;
        padding: 2px 5px;
        position: absolute;
        right: 20px;
        bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        border-radius: 20px;
        color: #ffffff;
        background: rgba(127, 127, 127, 0.6);
      }
    }

    ::v-deep .van-nav-bar {
      margin-top: 7px;
      height: 30px;
      border: 0;
      background: rgba(255, 255, 255, 0);
      &:after {
        content: none;
      }
      .van-nav-bar__left {
        .left_icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.9;
          border-radius: 50%;
          background: #7f7f7f;
          .icon-fanhui-copy {
            font-size: 20px;
            color: #ffffff;
          }
        }
      }
      .van-nav-bar__right {
        .right_icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.9;
          border-radius: 50%;
          background: #7f7f7f;
          .icon-fenxiang {
            font-size: 15px;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>