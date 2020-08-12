<template>
  <div class="select-add">
    <van-popup
      v-model="_showSelectAddress"
      :closeable="true"
      close-icon="close"
      round
      position="bottom"
      safe-area-inset-bottom
      lock-scroll
    >
      <template>
        <div class="address_box">
          <div class="address_title_box">
            <div class="title_text">{{$t('select-address.title')}}</div>
            <div class="deliver-text" v-if="_addressData">{{$t('select-address.subtitle')}}</div>
          </div>

          <div class="address-content">
            <!-- 有地址 -->
            <div class="son-box-exist" v-if="_addressData">
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>12312</div>
              <div>我是底部</div>
            </div>
            <!-- 无地址 -->
            <div class="nonexistent" v-if="!_addressData">
              <div class="address-img">
                <img class="img" src="~assets/images/selectAddress/selecr_address.png" />
              </div>
              <div class="address-text">{{$t('select-address.tipmessage')}}</div>
            </div>
          </div>
          <div class="footer_box">
            <van-tabbar :border="false" :placeholder="true" :safe-area-inset-bottom="true">
              <template>
                <div class="footer">
                  <van-button
                    class="footer-button"
                    round
                    color="#ea4952"
                    @click="onAddress"
                  >{{$t('select-address.newbutton')}}</van-button>
                </div>
              </template>
            </van-tabbar>
          </div>
        </div>
      </template>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    showSelectAddress: {
      type: Boolean,
      default: false
    },
    addressData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    _showSelectAddress: {
      get() {
        return this.showSelectAddress
      },
      set(v) {
        return this.$emit('update:showSelectAddress', v)
      }
    },
    _addressData() {
      return this.addressData.length
    }
  },
  methods: {
    onAddress() {
      this.$emit('click-new-address')
    }
  }
}
</script>

<style lang="scss" scoped>
.select-add {
  ::v-deep .van-popup {
    .address_box {
      .address_title_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        background: #ffffff;
        .title_text {
          padding-top: 42px;
          display: flex;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
        }
        .deliver-text {
          margin: 18px 0 0 12px;
          font-size: 16px;
        }
      }
      .address-content {
        width: 100%;
        max-height: 350px;
        overflow: hidden;
        overflow: auto;
        /*适应苹果*/
        -webkit-overflow-scrolling: touch;
        .son-box-exist {
          padding: 10px 0 10px 12px;
        }
        .nonexistent {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 27px 43px 70px 43px;
          .address-img {
            width: 100%;
            height: 203px;
          }
          .address-text {
            margin-top: 30px;
            font-size: 15px;
            color: #9f9c9f;
          }
        }
      }
      /*隐藏掉滚动条*/
      .address-content::-webkit-scrollbar {
        display: none;
      }

      .footer_box {
        .van-tabbar {
          .footer {
            width: 100%;
            padding: 0 10px;
            .footer-button {
              width: 100%;
              height: 45px;
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}
</style>