<template>
  <div class="default_box">
    <nuxt />
    <tab-bar />
  </div>
</template>

<script>
import tabBar from '~/components/tabBar'
export default {
  name: 'myDefault',
  components: {
    tabBar
  }
}
</script>
