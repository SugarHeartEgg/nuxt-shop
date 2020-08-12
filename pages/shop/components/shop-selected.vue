<template>
  <div class="shop-selected">
    <div class="selected_box" @click="onShowSku">
      <div class="selected_header">
        <div class="text_format">
          <div class="text">{{$t('shop.selected.selected-text')}}</div>
          <div class="format">{{specName}}</div>
        </div>
        <div class="right_icon">
          <i class="iconfont icon-jinru"></i>
        </div>
      </div>
      <div class="img_box">
        <img class="selected_img" v-for="(item, index) in _specImageList" :key="index" :src="item" />
        <div class="total">{{skuNumber}} {{$t('shop.selected.available')}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    specImageList: {
      type: Array,
      default() {
        return []
      },
    },
    specName: {
      type: String,
    },
    skuNumber: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showSku: false,
    }
  },
  computed: {
    _specImageList() {
      return this.specImageList.slice(0, 5)
    },
  },
  methods: {
    onShowSku() {
      this.showSku = !this.showSku
      this.$emit('onShowSku')
    },
  },
}
</script>

<style lang="scss" scoped>
.shop-selected {
  height: 95px;
  padding: 10px 13px 0 11px;
  margin-top: 10px;
  background: #ffffff;
  .selected_box {
    .selected_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .text_format {
        display: flex;
        align-items: center;
        .text {
          font-size: 15px;
          font-weight: 600;
        }
        .format {
          margin-left: 20px;
          font-size: 14px;
        }
      }
      .right_icon {
        .icon-jinru {
          font-size: 11px;
        }
      }
    }
    .img_box {
      margin-top: 19px;
      position: relative;
      display: flex;
      .selected_img {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .total {
        width: 75px;
        padding: 3px 10px;
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-size: 11px;
        border-radius: 3px;
        word-break: break-all;
        background: #ebebeb;
      }
    }
  }
}
</style>