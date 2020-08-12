<template>
  <div class="radioDefault">
    <div class="content">
      <div>{{$t('address.set-as-default')}}</div>
      <div>
        <van-switch
          v-model="_setDefault"
          :active-value="1"
          :inactive-value="0"
          active-color="#e84a50"
          inactive-color="#c9c6c7"
          size="20"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    setDefault: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    _setDefault: {
      get() {
        return this.setDefault
      },
      set(v) {
        return this.$emit('update:setDefault', v)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.radioDefault {
  .content {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>