<template>
  <van-list
    :loading-text="$t('grouplist.loading-text')"
    :finished-text="$t('grouplist.finished-text')"
    v-model="_groupListLoading"
    :finished="groupListFinished"
    :offset="offsetNum"
    @load="onLoad"
  >
    <slot />
  </van-list>
</template>


<script>
import { throttle } from 'lodash'
export default {
  name: 'myGroupList',
  props: {
    groupListLoading: {
      type: Boolean,
      default: false,
    },
    groupListFinished: {
      type: Boolean,
      default: false,
    },
    offsetNum: {
      type: Number,
      default: 100,
    },
  },
  computed: {
    _groupListLoading: {
      get() {
        return this.groupListLoading
      },
      set(v) {
        return this.$emit('update:groupListLoading', v)
      },
    },
  },
  methods: {
    onLoad: throttle(function () {
      this.$emit('sync-load')
    }, 3000),
  },
}
</script>
