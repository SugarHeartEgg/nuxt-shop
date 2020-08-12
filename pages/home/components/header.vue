<template>
  <div class="header_box">
    <div class="header_bgi">
      <div class="header_title">{{$t('home.header-title')}}</div>
      <div class="swipe_box">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item
            class="my-van-swipe-item"
            v-for="(item, index) in homepageDTOList"
            :key="index"
          >
            <van-image :src="item.imageUrl" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    homepageDTOList: {
      type: Array
    } // 轮播图
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.header_box {
  height: 202px;
  .header_bgi {
    height: 132px;
    background: url('~assets/images/home/header1.png');
    background-size: 100% 100%;
    .header_title {
      display: flex;
      justify-content: center;
      padding: 15px 0 0 0;
      font-size: 18px;
      color: #ffffff;
    }
    .swipe_box {
      padding: 20px 11px 0 11px;
      .my-swipe {
        z-index: 20;
        border-radius: 10px;
        .my-van-swipe-item {
          height: 145px;
          .van-image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>