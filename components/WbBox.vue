<template>
  <div class="rankingList">
    <div class="f-s-15">微博热搜</div>
    <div
      v-show="wbList.length > 0"
      class="rankingList-item"
      style="justify-content: flex-start"
      v-for="(item, index) in wbList"
      :key="index"
    >
      <span class="rl-item-index">{{ index + 1 }}</span>
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
import { ajaxGet } from '../utils/ajax'
const wbList = ref([])
ajaxGet('https://www.5cv.top/weibo/').then(res => {
  const data = []
  for (let index = 0; index < 10; index++) {
    if (!res.data.realtime[index].raw_hot) {
      index--
      continue
    }
    data.push({
      name: res.data.realtime[index].word + ' ',
      url:
        'https://s.weibo.com/weibo?q=' +
        encodeURIComponent(res.data.realtime[index].word_scheme),
      hotScore: res.data.realtime[index].raw_hot
    })
  }
  wbList.value = data
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
