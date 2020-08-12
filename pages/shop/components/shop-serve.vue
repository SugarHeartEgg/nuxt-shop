<template>
  <div class="shop-serve">
    <div class="serve_box">
      <div class="serve_text">{{$t('shop.serve.serve-text')}}</div>
      <div class="candee_serve">
        <div class="icon_box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-pinzhi" />
          </svg>
          <div class="text">{{$t('shop.serve.brands')}}</div>
        </div>
        <div class="icon_box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shandian" />
          </svg>
          <div class="text">{{$t('shop.serve.flash')}}</div>
        </div>
        <div class="icon_box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-qianjin" />
          </svg>
          <div class="text">{{$t('shop.serve.return')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shop-serve {
  height: 62px;
  margin-top: 10px;
  padding: 10px 13px 0 11px;
  background: #ffffff;
  .serve_box {
    .serve_text {
      font-size: 15px;
      font-weight: 600;
    }
    .candee_serve {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      .icon_box {
        display: flex;
        align-items: center;
        .icon {
          width: 13px;
          height: 13px;
          margin-right: 6px;
        }
        .text {
          font-size: 14px;
        }
      }
    }
  }
}
</style>