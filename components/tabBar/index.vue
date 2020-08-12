<template>
  <div class="tab_bar">
    <van-tabbar
      class="iconfont"
      active-color="#e84a51"
      :border="false"
      :placeholder="true"
      :safe-area-inset-bottom="true"
      v-model="active"
    >
      <van-tabbar-item
        icon-prefix="icon"
        icon="shouyemianxing"
        name="home"
        :to="localeRoute('home')"
      >{{$t('tabbar.home')}}</van-tabbar-item>
      <van-tabbar-item
        icon-prefix="icon"
        icon="fenleimianxing"
        name="sort"
        :to="localeRoute('sort')"
      >{{$t('tabbar.sort')}}</van-tabbar-item>
      <van-tabbar-item
        icon-prefix="icon"
        icon="VIPxianxing"
        name="vip"
        :to="localeRoute('vip')"
      >{{$t('tabbar.vip')}}</van-tabbar-item>
      <van-tabbar-item
        icon-prefix="icon"
        icon="gouwuchemianxing"
        :badge="cartNum"
        name="cart"
        :to="localeRoute('shoppingCart')"
      >{{$t('tabbar.cart')}}</van-tabbar-item>
      <van-tabbar-item
        icon-prefix="icon"
        icon="wodemianxing"
        name="my"
        :to="localeRoute('mine')"
      >{{$t('tabbar.me')}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { getCartCount } from '~/assets/utils/api/cart/api-serve'
export default {
  data() {
    return {
      active: 'home',
      cartCount: 0,
    }
  },
  computed: {
    currentRouteName() {
      const uriName = this.$router.currentRoute.name
      console.log(uriName)
      // console.log(uriName.length)
      switch (true) {
        case uriName.indexOf('home') != -1:
          return 'home'
        case uriName.indexOf('sort') != -1:
          return 'sort'
        case uriName.indexOf('vip') != -1:
          return 'vip'
        case uriName.indexOf('shoppingCart') != -1:
          return 'cart'
        case uriName.indexOf('mine') != -1:
          return 'my'
      }
    },
    ...mapState('cart', {
      cartNum: 'cartNum',
    }),
  },
  created() {
    this.initRouter()
    this.getCartStore()
  },
  methods: {
    initRouter() {
      this.active = this.currentRouteName
    },
    // 查询购物车数量
    getCartStore() {
      this.$store.dispatch('cart/getCartNum', {
        $axios: this.$axios,
      })
    },
  },
  watch: {
    $route(to) {
      const watchUroName = to.name
      console.log(watchUroName)
      console.log(watchUroName.indexOf('home') != -1)
      switch (true) {
        case watchUroName.indexOf('home') != -1:
          this.active = 'home'
          break
        case watchUroName.indexOf('sort') != -1:
          this.active = 'sort'
          break
        case watchUroName.indexOf('vip') != -1:
          this.active = 'vip'
          break
        case watchUroName.indexOf('shoppingCart') != -1:
          this.active = 'cart'
          break
        case watchUroName.indexOf('mine') != -1:
          this.active = 'my'
          break
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.tab_bar {
  z-index: 60;
}
</style>