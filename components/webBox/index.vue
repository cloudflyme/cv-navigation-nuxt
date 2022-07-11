<template>
  <div class="web-box">
    <div :id="val.id" class="list" v-for="val in order.list" :key="val.id">
      <h3 :id="val.id">{{ val.name }}</h3>
      <div class="list-box" :id="val.id" @dragstart.stop>
        <a
          :title="item.title"
          :id="val.id"
          @click="handleRecord(item)"
          :href="item.url"
          target="_blank"
          class="list-box-item"
          v-for="(item, index) in val.data"
          :key="index"
        >
          <img
            :id="val.id"
            v-lazyload="item.src"
            :alt="item.text"
            @error="errorImg"
          />
          <span :id="val.id">{{ item.text }}</span>
        </a>
      </div>
    </div>
  </div>
  <MyAnchor
    @change="handleChange"
    class="fixed-rigth"
    style="position: fixed; top: calc(50% - 240px); right: 20px"
    :options="linkData"
  ></MyAnchor>
</template>

<script setup>
import vLazyload from '../../directives/lazyLoad.js'
import { map } from 'lodash-es/lodash'
import { setLocal, getUploadData } from '../../utils/local'
import { allData } from '../../vendor/data.js'

const objName = {
  algorithm: '算法',
  course: '教程',
  community: '社区',
  uiLib: 'UI框架',
  frame: '框架',
  archive: '文档',
  buildTools: '构建工具',
  classLib: '类库',
  tool: '工具',
  Design: '设计',
  collaborativeOffice: '协同办公',
  language: '语言',
  Icon: '图标',
  cssTool: 'css工具',
  svgTool: 'svg工具',
  designTool: '设计工具',
  chartFrame: '可视化图表库',
  vscode: 'vscode插件'
}

const order = reactive({
  list: []
})
const linkData = ref([])

const handleClick = e => {
  e.preventDefault()
}
onMounted(() => {
  let isNull = window.localStorage.getItem('order')
  let orderData = [
    'course',
    'community',
    'archive',
    'classLib',
    'uiLib',
    'frame',
    'chartFrame',
    'Design',
    'Icon',
    'algorithm',
    'language',
    'collaborativeOffice',
    'designTool',
    'buildTools',
    'svgTool',
    'cssTool',
    'tool',
    'vscode'
  ]
  if (isNull !== null) {
    orderData = orderData.sort(function (a, b) {
      return isNull.indexOf(a) - isNull.indexOf(b)
    })
  }

  order.list = map(orderData, i => {
    return {
      name: objName[i],
      data: allData[i],
      id: i
    }
  })
  linkData.value = orderData.map(item => {
    return {
      id: item,
      name: objName[item]
    }
  })
  getUploadData() // 上传访问次数
})
function handleChange(orderData) {
  order.list = map(orderData, i => {
    return {
      name: objName[i.id],
      data: allData[i.id],
      id: i.id
    }
  })
  linkData.value = orderData
}
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
function errorImg(e) {
  e.target.src =
    'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-39734fbc-b241-4d89-ad87-0befd655e266/526d7257-c2e7-47f5-b850-06a6332ab012.png'
}
</script>

<style lang="less" scoped>
h3 {
  font-size: 15px;
  padding-left: 46px;
  font-weight: 600;
  flex-shrink: 0;
  border-bottom: 0.5px solid #f5f5f5;
}

.list {
  border-radius: 8px;
  background-color: #fff;
  line-height: 42px;
  margin-bottom: 20px;
}
.list {
  &-box {
    padding: 0 48px 10px;
    display: flex;
    flex-wrap: wrap;
    &-item {
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
}

.web-box {
  margin-top: 20px;
}
</style>
