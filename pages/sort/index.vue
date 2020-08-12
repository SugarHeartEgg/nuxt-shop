<template>
  <div class="sort">分类</div>
</template>


<script>
export default {
  name: 'mysort',
  head() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      title: this.$route.name
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.sort {
  background: #ffffff;
}
</style>