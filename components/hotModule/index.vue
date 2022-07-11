<template>
  <div class="hot">
    <div class="title-icon" />
    <div class="hot-box">
      <a
        @click="handleRecord(item)"
        :href="item.url"
        target="_blank"
        class="hot-box-item"
        v-for="item in data.list"
        :key="item.text"
      >
        <img v-lazyload="item.src" :alt="item.text" @error="errorImg" />
        <span>{{ item.text }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ajaxGet } from '../../utils/ajax.js'
import vLazyload from '../../directives/lazyLoad.js'
// import { forEach, find, forIn } from 'lodash-es/lodash'
import { allData } from '../../vendor/data.js'
import { setLocal } from '../../utils/local'
const data = reactive({
  list: []
})

function handleRecord(d) {
  const item = JSON.parse(JSON.stringify(d))
  delete item.src
  delete item.url
  delete item.title
  const isNull = window.localStorage.getItem('record')
  let data = []
  if (isNull !== null) data = JSON.parse(isNull).value
  const fData = data.find(v => v.text === item.text)
  if (fData) {
    fData.num++
    setLocal('record', [...data])
  } else {
    item.num = 1
    setLocal('record', [...data, item])
  }
}

function query(textList) {
  let reArr = []
  const array = Object.values(allData)
  let i = 0
  Outside: while (i < array.length) {
    let j = 0
    while (j < array[i].length) {
      if (textList.length === reArr.length) {
        break Outside
      }
      if (textList.includes(array[i][j].text)) {
        reArr.push(array[i][j])
      }
      j++
    }
    i++
  }
  return reArr.sort((a, b) =>  textList.indexOf(a.text) - textList.indexOf(b.text))
}

onMounted(() => {
  function getHotList(t) {
    ajaxGet(
      'https://39734fbc-b241-4d89-ad87-0befd655e266.bspapp.com/getHotList'
    )
      .then(res => {
        data.list = query(res)
        sessionStorage.setItem('hostList', JSON.stringify(data.list))
      })
      .catch(() => {})
  }
  const hostList = sessionStorage.getItem('hostList')
  if (hostList) {
    data.list = JSON.parse(hostList)
    getHotList()
  } else {
    getHotList(1)
  }
})
function handleRemove(e) {
  tooltip.hidden()
}
function errorImg(e) {
  e.target.src =
    'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-39734fbc-b241-4d89-ad87-0befd655e266/526d7257-c2e7-47f5-b850-06a6332ab012.png'
}
</script>

<style lang="less" scoped>
.tooltip {
  padding: 12px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 20px;
}
.hot-box {
  padding: 20px 48px;
  display: flex;
  flex-wrap: wrap;
  &-item {
    display: flex;
    align-items: center;
    height: 42px;
    flex-shrink: 0;
  }
  img,
  span {
    vertical-align: middle;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
}
.hot {
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  position: relative;
}
.title-icon {
  position: absolute;
  top: 0;
  width: 40px;
  height: 40px;
  background: url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-39734fbc-b241-4d89-ad87-0befd655e266/273b3c5d-05d6-42ec-ad39-e32097e7ffe7.svg);
  background-size: cover;
}
</style>
