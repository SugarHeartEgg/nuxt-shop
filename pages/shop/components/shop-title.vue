<template>
  <div class="shop-title">
    <div class="content">
      <div class="text">
        <div class="candee_icon">{{$t('candee')}}</div>
        {{goodsInfoName}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsInfoName: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-title {
  padding: 10px 13px 0 11px;
  background: #ffffff;
  .content {
    .text {
      font-size: 15px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      .candee_icon {
        width: 50px;
        height: 13px;
        margin-right: 5px;
        padding: 2px 2px 0 2px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 600;
        color: #ffffff;
        background: #fd3549;
        border-radius: 3px;
      }
    }
  }
}
</style>