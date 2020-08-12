<template>
  <van-popup
    v-model="_showSelectBox"
    round
    closeable
    position="bottom"
    :style="{ height: '65%',width: '100%' }"
  >
    <div class="address-pop-box">
      <div class="pop_title">{{$t('address.address-list.title')}}</div>
      <van-tabs
        class="select_address_box"
        title-active-color="#e74a51"
        :border="false"
        v-model="_activeName"
        @click="onTab"
      >
        <van-tab :title="$t('address.address-list.state-title')" name="a">
          <div class="state_box" v-for="item in addressProvincies" :key="item.provinceId">
            <div
              class="content"
              :class="{active : active == item.provinceId}"
              @click="onProvince(item)"
            >{{item.provinceName}}</div>
          </div>
        </van-tab>
        <van-tab :title="$t('address.address-list.city-title')" name="b">
          <div class="city_box" v-for="item in addressCities" :key="item.cityId">
            <div
              class="content"
              :class="{citiesActive : citiesActive == item.cityId}"
              @click="onCities(item)"
            >{{item.cityName}}</div>
          </div>
        </van-tab>
        <van-tab :title="$t('address.address-list.postCode-title')" name="c">
          <div class="post_code_box" v-for="item in postcode" :key="item.postcodeId">
            <div
              class="content"
              :class="{citiesPostCode : citiesPostCode == item.postcodeId}"
              @click="onPostCode(item)"
            >{{item.postcodeName}}</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </van-popup>
</template>

<script>
export default {
  props: {
    showSelectBox: {
      type: Boolean,
      default: false,
    },
    activeName: {
      type: String,
      default: 'a',
    },
    addressProvincies: {
      type: Array,
      default() {
        return []
      },
    },
    addressCities: {
      type: Array,
      default() {
        return []
      },
    },
    postcode: {
      type: Array,
      default() {
        return []
      },
    },
  },
  computed: {
    _showSelectBox: {
      get() {
        return this.showSelectBox
      },
      set(v) {
        return this.$emit('update:showSelectBox', v)
      },
    },
    _activeName: {
      get() {
        return this.activeName
      },
      set(v) {
        return this.$emit('update:activeName', v)
      },
    },
  },
  data() {
    return {
      active: null,
      citiesActive: null,
      citiesPostCode: null,
    }
  },
  methods: {
    onTab(params) {
      this.$emit('update:activeName', params)
    },
    onProvince(provinceItem) {
      this.active = provinceItem.provinceId
      this.$emit('click-state', provinceItem)
    },
    onCities(citiesItem) {
      this.citiesActive = citiesItem.cityId
      this.$emit('click-city', citiesItem)
    },
    onPostCode(postCodeItem) {
      this.citiesPostCode = postCodeItem.postcodeId
      this.$emit('click-postcode', postCodeItem)
    },
  },
}
</script>

<style lang="scss" scoped>
.van-popup {
  .address-pop-box {
    padding: 17px 10px 0 10px;
    .pop_title {
      text-align: center;
      padding-bottom: 13px;
      font-size: 15px;
      border-bottom: 1px solid #f2f2f2;
    }
    .select_address_box {
      //   border-bottom: 1px solid #f2f2f2;
      padding-bottom: 20px;
      ::v-deep .van-tabs__content {
        margin-top: 10px;
        width: 100%;
        max-height: 270px;
        padding-bottom: 10px;
        overflow: hidden;
        overflow: auto;
        /*适应苹果*/
        -webkit-overflow-scrolling: touch;
        .state_box {
          padding: 0 30px 0 30px;
          .content {
            height: 40px;
            display: flex;
            align-items: center;
            font-size: 13px;
            border-bottom: 1px solid #f2f2f2;
          }
          .active {
            color: #e74a51;
          }
        }
        .city_box {
          padding: 0 30px 0 30px;
          .content {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            font-size: 13px;
            border-bottom: 1px solid #f2f2f2;
          }
          .citiesActive {
            color: #e74a51;
          }
        }
        .post_code_box {
          padding: 0 30px 0 30px;
          .content {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            font-size: 13px;
            border-bottom: 1px solid #f2f2f2;
          }
          .citiesPostCode {
            color: #e74a51;
          }
        }
      }
      /*隐藏掉滚动条*/
      .van-tabs__content::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>