<template>
  <div class="rankingList">
    <div class="f-s-15">微博热搜</div>
    <div
      v-show="wbList.length > 0"
      class="rankingList-item"
      style="justify-content: flex-start"
      v-for="item in wbList"
      :key="item.index"
    >
      <span class="rl-item-index">{{ item.index + 1 }}</span>
      <a
        :href="item.url"
        class="rl-item-text text-overflow"
        style="width: 90%"
        target="_blank"
        >{{ item.name }}</a
      >
    </div>
    <div class="w-100" v-show="wbList.length === 0">
      <MySpin tip="Loading..." />
    </div>
  </div>
</template>

<script setup>
import { ajaxGet } from '../utils/ajax.js'
const wbList = ref([])
ajaxGet('https://tenapi.cn/resou/').then(res => {
  res.list.forEach((item, index) => {
    item.name = item.name + ' '
    item.index = index
  })
  wbList.value = res.list
})
onMounted(() => {})
</script>

<style lang="less" scoped>
.w-100 {
  display: flex;
  justify-content: center;
  width: 100%;
}
</style>
