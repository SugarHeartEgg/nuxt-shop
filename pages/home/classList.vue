<template>
  <div class="class_list">
    <div>
      <class-list-header :classList="classList" />
      <class-list-shop :records="classList.records" />
    </div>
  </div>
</template>

<script>
import classListHeader from './components/class-list-header'
import classListShop from './components/class-list-shop'
export default {
  layout: 'newtam',
  name: 'my-class-list',
  async asyncData({ $axios, query }) {
    const classList = await $axios.$get(
      `/goods-service/category/hot?oneCategoryId=${query.catId}`
    )
    return {
      classList
    }
  },
  components: {
    classListHeader,
    classListShop
  }
}
</script>
