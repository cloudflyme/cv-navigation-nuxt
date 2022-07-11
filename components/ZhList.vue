<template>
  <div class="rankingList">
    <div class="f-s-15">知乎热搜</div>
    <div
      v-show="zhList.length > 0"
      class="rankingList-item"
      style="justify-content: flex-start"
      v-for="(item, index) in zhList"
      :key="index"
    >
      <span class="rl-item-index">{{ index + 1 }}</span>
      <a
        :href="item.url"
        class="rl-item-text text-overflow"
        style="width: 90%"
        target="_blank"
        >{{ item.query }}</a
      >
    </div>
    <div class="w-100" v-show="zhList.length === 0">
      <MySpin tip="Loading..." />
    </div>
  </div>
</template>

<script setup>
import { ajaxGet } from '../utils/ajax'
const zhList = ref([])
ajaxGet('https://www.5cv.top/zhihu/').then(res => {
  zhList.value = res.top_search.words.map(item => {
    return {
      query: item.query + ' ',
      url: `https://www.zhihu.com/search?q=${encodeURIComponent(
        item.query
      )}&utm_content=search_hot&type=content`
    }
  })
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
