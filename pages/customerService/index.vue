<template>
  <div class="customerService">
    <van-nav-bar
      :title="$t('enter-order.title')"
      left-arrow
      fixed
      :placeholder="true"
      :border="false"
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>