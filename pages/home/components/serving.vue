<template>
  <div class="serving">
    <div class="serving_icon_box">
      <i class="iconfont icon-pinzhi serving_icon"></i>
      <span class="serving_text">{{$t('home.serving-text.brands')}}</span>
    </div>
    <div class="serving_icon_box">
      <i class="iconfont icon-shandian serving_icon"></i>
      <span class="serving_text">{{$t('home.serving-text.flash')}}</span>
    </div>
    <div class="serving_icon_box">
      <i class="iconfont icon-qianjin serving_icon"></i>
      <span class="serving_text">{{$t('home.serving-text.return')}}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.serving {
  margin-top: 20px;
  padding: 0 11px;
  display: flex;
  justify-content: space-between;
  .serving_icon_box {
    display: flex;
    align-items: center;
    .serving_icon {
      margin-right: 6px;
      font-size: 13px;
      color: #e95b61;
    }
    .serving_text {
      line-height: 13px;
      font-size: 14px;
    }
  }
}
</style>