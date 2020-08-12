<template>
  <div class="select_box">
    <div class="dropdown-list">
      <ul class="list-box" v-for="(item, index) in dropdownlist" :key="index">
        <li class="son-box" @click="onAreaCode(item)">
          <span class="son-text">
            <van-image class="bgi-icon" :src="item.url" />
            <span class="area-code">{{item.text}}</span>
          </span>
          <span class="country">{{item.country}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import malaysia from '~/assets/images/login/malaysia.png'
import china from '~/assets/images/login/china.png'

export default {
  data() {
    return {
      dropdownlist: [
        {
          text: '+60',
          value: '60',
          country: 'Malaysia',
          url: malaysia
        },
        {
          text: '+86',
          value: '86',
          country: 'China',
          url: china
        }
      ]
    }
  },
  methods: {
    onAreaCode(AreaValue) {
      this.$emit('emitAreaCode', AreaValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.select_box {
  .dropdown-list {
    .list-box {
      display: flex;
      flex-direction: column;
      .son-box {
        height: 25px;
        margin-top: 10px;
        padding: 0 10px 0 0px;
        display: flex;
        justify-content: space-between;
        position: relative;
        &:after {
          content: '';
          width: 100%;
          height: 1px;
          position: absolute;
          box-sizing: border-box;
          pointer-events: none;
          bottom: 0;
          margin-top: 10px;
          background-color: #cdcdcd;
        }
        .son-text {
          display: flex;
          .bgi-icon {
            width: 28px;
            height: 18px;
            margin-left: 3px;
          }
          .area-code {
            display: flex;
            line-height: 18px;
            margin-left: 3px;
          }
        }
      }
    }
  }
}
</style>