<template>
  <div class="mine">
    <div>mine</div>
    <div class="login_out">
      <van-button @click="onLogin" v-show="!isToken">临时的登录按钮</van-button>

      <van-button @click="onLoginOut" v-show="isToken">临时的登出按钮</van-button>
    </div>

    <div class="in8">
      <div class="links">
        <a
          v-for="locale in $i18n.locales"
          :key="locale.code"
          @click="changeLanguage(locale.code)"
          class="button--grey"
        >{{ locale.name }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mymine',
  data() {
    return {}
  },
  computed: {
    isToken() {
      if (this.$cookies.get('token')) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    // 语言切换
    changeLanguage(code) {
      this.$i18n.setLocale(code)
    },
    onLogin() {
      this.$router.push(
        this.localeRoute({
          name: 'mine-login',
          query: { isBack: true }
        })
      )
    },
    onLoginOut() {
      console.log(123)
      this.$cookies.remove('token')
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
.mine {
  min-height: 100vh;
  .login_out {
    display: flex;
    justify-content: center;
  }
  .in8 {
    margin-top: 10px;
    .button--grey {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid #35495e;
      color: #35495e;
      text-decoration: none;
      padding: 10px 30px;
      margin-left: 15px;
    }

    .button--grey:hover {
      color: #fff;
      background-color: #35495e;
    }
  }
}
</style>