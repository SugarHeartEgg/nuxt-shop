<template>
  <div class="share-popup">
    <van-popup v-model="_shareshow" closeable position="bottom" @close="onClear">
      <social-sharing
        :url="share.url"
        :title="share.title"
        :description="share.description"
        inline-template
      >
        <div class="sharediv">
          <network network="facebook" class="share">
            <div class="img_div">
              <svg class="share_img" aria-hidden="true">
                <use xlink:href="#icon-lianshu" />
              </svg>
            </div>
            <div>facebook</div>
          </network>
          <network network="whatsapp" class="share">
            <div class="img_div">
              <svg class="share_img" aria-hidden="true">
                <use xlink:href="#icon-whatsapp" />
              </svg>
            </div>
            <div>whatsapp</div>
          </network>
        </div>
      </social-sharing>
    </van-popup>
  </div>
</template>

<script>
import SocialSharing from 'vue-social-sharing'

export default {
  props: {
    shareshow: {
      type: Boolean,
      default: false
    },
    share: {
      type: Object
    }
  },
  computed: {
    _shareshow: {
      get() {
        return this.shareshow
      },
      set(v) {
        this.$emit('update:shareshow', v)
      }
    }
  },
  methods: {
    onClear() {
      this._shareshow = false
    }
  },
  components: {
    SocialSharing
  }
}
</script>

<style lang="scss" scoped>
.share-popup {
  ::v-deep .sharediv {
    padding: 12px;
    display: flex;
    justify-content: space-around;
    .share {
      .img_div {
        width: 50px;
        height: 50px;
        .share_img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>