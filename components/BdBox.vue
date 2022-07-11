<template>
  <div class="rankingList">
    <div class="f-s-15">百度热搜</div>
    <div class="rankingList-item" v-for="item in list" :key="item.index">
      <span class="rl-item-index">{{ item.index + 1 }}</span>
      <a :href="item.link" class="rl-item-text text-overflow" target="_blank">{{
        item.text
      }}</a>
      <span class="rl-item-num">{{ item.hotValue }}</span>
    </div>
  </div>
</template>

<script setup>
import {ajaxGet} from '../utils/ajax'
const list = ref([])
ajaxGet('https://www.5cv.top/hotbaidu/').then(({ data }) => {
  data.forEach(item => {
    if (item.hotValue > 10000)
      item.hotValue = parseInt(item.hotValue / 10000) + '万'
  })
  list.value = data.slice(0, 10)
})
onMounted(() => {})
</script>

<style lang="less" scoped></style>
