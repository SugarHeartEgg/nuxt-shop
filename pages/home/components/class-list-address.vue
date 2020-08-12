<template>
  <div class="class_header_box">
    <div class="header_bgi">
      <van-nav-bar
        :title="$t('home.class-list.class-name')"
        :placeholder="true"
        :fixed="true"
        :border="false"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="class_img_box">
        <div class="class_img">
          <img class="class_img_one" :src="classList.oneCategoryImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classList: {
      type: Object
    }
  },
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.class_header_box {
  height: 210px;
  background: #f2f2f2;
  .header_bgi {
    height: 132px;
    background: url('~assets/images/home/header1.png');
    background-size: 100% 100%;
    ::v-deep .van-nav-bar {
      z-index: 3;
      background: #e94950;
      .van-nav-bar__left {
        .van-icon-arrow-left {
          color: #ffffff;
        }
      }
      .van-nav-bar__title {
        color: #ffffff;
      }
    }
    .class_img_box {
      padding: 20px 11px 0 11px;
      .class_img {
        width: 100%;
        height: 145px;
        .class_img_one {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>