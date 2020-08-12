<template>
  <div class="shop-payment-method">
    <div class="method_box">
      <div class="method_text">{{$t('shop.method.text')}}</div>
      <div class="method-name">
        <div class="left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-ipay" />
          </svg>
          <div>{{$t('shop.method.method-name')}}</div>
        </div>
        <div class="right">
          <svg class="icon zhifuxin" aria-hidden="true">
            <use xlink:href="#icon-huodaofukuan2" />
          </svg>
          <svg class="icon zhifuxin" aria-hidden="true">
            <use xlink:href="#icon-zhifuxin" />
          </svg>
          <svg class="icon touch" aria-hidden="true">
            <use xlink:href="#icon-touchnGO" />
          </svg>
          <svg class="icon fpx" aria-hidden="true">
            <use xlink:href="#icon-FPX" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shop-payment-method {
  height: 77px;
  margin-top: 10px;
  padding: 10px 13px 0 11px;
  background: #ffffff;
  .method_box {
    .method_text {
      font-size: 15px;
      font-weight: 600;
    }
    .method-name {
      margin-top: 12px;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .icon {
          width: 24px;
          height: 24px;
          margin-right: 7px;
        }
      }
      .right {
        display: flex;
        .icon {
          margin-left: 10px;
        }
        .zhifuxin {
          width: 22px;
          height: 22px;
        }
        .touch {
          width: 22px;
          height: 22px;
        }
        .fpx {
          width: 46px;
          height: 22px;
        }
      }
    }
  }
}
</style>