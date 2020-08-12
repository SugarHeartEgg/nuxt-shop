<template>
  <div class="classify">
    <div class="classify_shop">
      <div class="shop_box" v-for="(item, index) in homeHotCategoryDTOList" :key="index">
        <div class="shop_title">{{item.catName}}</div>
        <div class="shop_content" @click.stop="onClassList(item.catId)">
          <van-image
            v-for="(items, index) in item.homeHotCategorySkuDTOList"
            :key="index"
            :src="items.goodsInfoImgId"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    homeHotCategoryDTOList: {
      type: Array
    }
  },
  methods: {
    onClassList(catId) {
      console.log(catId)
      this.$router.push(
        this.localeRoute({ name: 'home-classList', query: { catId } })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.classify {
  padding: 10px 11px;
  .classify_shop {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-radius: 10px;
    background: #ffffff;
    &:after {
      content: '';
      width: 1px;
      height: 92%;
      display: block;
      box-sizing: border-box;
      position: absolute;
      top: 4%;
      left: 50%;
      background: #f2f2f2;
    }
    .shop_box {
      padding: 10px 10px 18px 10px;
      .shop_title {
        font-size: 12px;
        font-weight: 600;
      }
      .shop_content {
        display: flex;
        flex-direction: row;
        padding-top: 8px;
        .van-image {
          width: 70px;
          height: 70px;
        }
      }
    }
  }
}
</style>