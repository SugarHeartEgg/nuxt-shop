<template>
  <div class="snapped_up">
    <div class="time_box">
      <div class="time_header">
        <div class="left">
          <i class="iconfont icon-shandian"></i>
          <p class="text">{{$t('home.time.title')}}</p>
        </div>
        <div class="right">
          <div class="text">{{$t('home.time.in')}}</div>
          <div class="count_box">
            <van-count-down :time="time">
              <template v-slot="timeData">
                <span class="block">{{ timeData.hours | time-add }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes | time-add }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds | time-add }}</span>
              </template>
            </van-count-down>
          </div>
        </div>
      </div>

      <div class="time_tab">
        <div class="time_tab_content">
          <div
            v-for="(item,index) in homeSaleDTOList"
            :key="index"
            class="demo"
            :class="{demoColor:index == tabNum}"
            @click="timeClick(item.saleId,index)"
          >
            <div class="time_text">{{item.startTime}}</div>
            <div class="time_name">{{item.state}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- shopList -->
    <div class="snapped_shop_list">
      <shop-list :records="records" />
    </div>
  </div>
</template>

<script>
import shopList from './shopList'
import { validMillisecond } from '~/assets/utils/validate'

export default {
  props: {
    homeSaleDTOList: {
      type: Array
    }
  },
  data() {
    return {
      shopList: null,
      records: null,
      time: null,
      tabNum: 0
    }
  },
  mounted() {
    // 默认选中 第一个
    if (this.homeSaleDTOList[0].saleId) {
      this.timeClick(this.homeSaleDTOList[0].saleId)
    }
  },
  methods: {
    async timeClick(saleId, index = 0) {
      this.tabNum = index

      this.shopList = await this.$axios.$get(
        `/goods-service/sale/listHomeSaleGoods?saleId=${saleId}`
      )
      this.records = this.shopList.records

      this.time = validMillisecond(this.shopList.expire)
    }
  },
  components: {
    shopList
  }
}
</script>

<style lang="scss" scoped>
.snapped_up {
  padding: 0 11px 0 11px;
  .time_box {
    height: 101px;
    border-radius: 10px;
    background: #ffffff;
    .time_header {
      padding: 16px 10px 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        align-items: center;
        .icon-shandian {
          margin-right: 6px;
          font-size: 17px;
          color: #e95b5d;
        }
        .text {
          font-size: 17px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .text {
          margin-right: 6px;
          font-size: 12px;
        }
        .count_box {
          .colon {
            display: inline-block;
            margin: 0 1px;
            color: #333333;
          }
          .block {
            display: inline-block;
            width: 22px;
            color: #333333;
            font-size: 12px;
            text-align: center;
            background-color: #eaeaea;
          }
        }
      }
    }
  }
  .time_tab {
    padding: 17px 15px 0 15px;
    .time_tab_content {
      overflow: hidden;
      display: flex;
      overflow: auto;
      /*适应苹果*/
      -webkit-overflow-scrolling: touch;
      .demo {
        margin-right: 35px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .time_text {
          font-size: 17px;
        }
        .time_name {
          margin-top: 5px;
          padding: 2px 5px;
          font-size: 11px;
          color: #9d9d9d;
        }
      }
      .demoColor {
        color: #e84a51;
        .time_name {
          //   width: 30px;
          //   display: flex;
          //   justify-content: center;
          margin-top: 5px;
          padding: 2px 5px;
          font-size: 11px;
          color: #ffffff;
          background: #e84a51;
          border-radius: 10px;
        }
      }
    }
    /*隐藏掉滚动条*/
    .time_tab_content::-webkit-scrollbar {
      display: none;
    }
  }
  .snapped_shop_list {
    margin-top: 6px;
  }
}
</style>