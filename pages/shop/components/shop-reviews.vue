<template>
  <div class="shop-reviews">
    <div class="reviews_box">
      <div class="reviews_text">{{$t('shop.reviews.reviews-text')}}(123)</div>
      <div class="right_icon">
        <span>{{$t('shop.reviews.right-text')}}</span>
        <i class="iconfont icon-jinru"></i>
      </div>
    </div>
    <div class="good_view">
      <div class="googs">{{$t('shop.reviews.praise')}}({{12}})</div>
      <div class="views">{{$t('shop.reviews.with-raph')}}({{12}})</div>
    </div>

    <div class="user-message_box">
      <div class="user-message">
        <div class="left">
          <div class="user-photo"></div>
          <div class="user-info">
            <div class="user-name">helun用户</div>
            <div class="user-rate">
              <van-rate
                v-model="value"
                readonly
                size="10px"
                allow-half
                void-color="#ff7a7a"
                color="#ff3333"
              />
            </div>
          </div>
        </div>
        <div class="right">2020.06.18 14:23:31</div>
      </div>
      <div class="reviews-message">123123123123</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 4
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-reviews {
  margin-top: 10px;
  padding: 10px 13px 0 11px;
  background: #ffffff;
  .reviews_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .reviews_text {
      font-size: 15px;
      font-weight: 600;
    }
    .right_icon {
      .icon-jinru {
        font-size: 11px;
      }
    }
  }
  .good_view {
    margin-top: 17px;
    display: flex;
    .googs {
      width: 88px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      background: #feebe9;
    }
    .views {
      width: 88px;
      height: 25px;
      margin-left: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      background: #feebe9;
    }
  }
  .user-message_box {
    padding-bottom: 24px;
    .user-message {
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .user-photo {
          width: 44px;
          height: 44px;
          margin-right: 9px;
          border-radius: 50%;
          background: hotpink;
        }
        .user-info {
          .user-rate {
            margin-top: 7px;
          }
        }
      }
    }
    .reviews-message {
      margin-top: 13px;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
}
</style>