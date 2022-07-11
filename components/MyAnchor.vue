<template>
  <div class="MyAnchor">
    <div class="anchor-ink">
      <span
        class="visible"
        v-show="active !== -1"
        :style="{ top: 30 * active + 11 + 'px' }"
      ></span>
    </div>
    <div
      :id="item.id"
      draggable="true"
      @dragstart="handleDragstart"
      @dragover="handleDragover"
      @drop="handleDrop"
      class="anchor-item"
      :style="{ color: active === index ? '#1890ff' : '' }"
      v-for="(item, index) in options"
      :key="index"
      @click="scrollToTop(index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { throttle, cloneDeep } from 'lodash-es/lodash'
const emit = defineEmits(['change'])
const props = defineProps({
  options: Array
})
const topLink = ref([])
const active = ref(-1)
const flag = ref(true)
let offsetTop = []
onMounted(() => {
  window.onscroll = throttle(function () {
    let top = document.documentElement.scrollTop || document.body.scrollTop
    top = top - 10
    if (flag.value) {
      if (top > offsetTop[0]) {
        offsetTop.forEach((item, index, arr) => {
          const len = arr.length - 1
          if (top > item && index === len) {
            active.value = len
          } else if (top >= item && top <= arr[index + 1]) {
            active.value = index
          }
        })
      } else {
        active.value = -1
      }
    }

    if (!flag.value) {
      flag.value = true
    }
  }, 100)
})
function handleDragstart(event) {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('id', event.target.id)
}
function handleDragover(event) {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}
function findIdorData(id) {
  let index = -1
  const data = props.options.find((item, i) => {
    index = i
    return item.id == id
  })
  return { index, data }
}
function handleDrop(event) {
  const ids = JSON.parse(JSON.stringify(props.options))
  let a = findIdorData(event.target.id)
  let b = findIdorData(event.dataTransfer.getData('id'))
  ids.splice(a.index, 1, b.data)
  ids.splice(b.index, 1, a.data)
  emit('change', ids)

  localStorage.setItem('order', JSON.stringify(ids.map(item => item.id)))
}
onUpdated(() => {
  topLink.value = cloneDeep(props.options)
  offsetTop = props.options.map(
    item => document.getElementById(item.id).offsetTop
  )
  topLink.value.forEach((item, index) => {
    item.top = offsetTop[index]
  })
})
function scrollToTop(i) {
  flag.value = false
  active.value = i
  window.scrollTo(0, topLink.value[i].top + 20)
}
</script>

<style lang="less" scoped>
.visible {
  position: absolute;
  left: 50%;
  width: 8px;
  height: 8px;
  background-color: #fff;
  border: 2px solid #1890ff;
  border-radius: 8px;
  transform: translate(-50%);
  transition: top 0.3s ease-in-out;
}
.MyAnchor {
  position: relative;
  padding-left: 16px;
}
.anchor-ink {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
}
.anchor-ink:before {
  position: relative;
  display: block;
  width: 2px;
  height: 100%;
  margin: 0 auto;
  background-color: #f0f0f0;
  content: ' ';
}
.anchor-item {
  user-select: none;
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  transition: all 0.3s;
}
.anchor-item:hover {
  color: #40a9ff;
}
</style>
