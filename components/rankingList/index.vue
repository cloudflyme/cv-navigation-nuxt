<template>
  <MyDropDown v-model="visible" :trigger="'click'" class="m-b-20">
    <div class="weather">
      {{ weather }} <span class="iconfont icon-shezhi-xianxing"></span>
    </div>
    <template #overlay>
      <div class="flex tankuang">
        <div v-for="(item, index) in options" :key="index" class="flex-box">
          <span :class="`iconfont ${item.i}`"></span>
          <div class="box">
            <span>{{ item.t }}</span>
            <MySwitch
              size="small"
              v-model="selectedKeys[index]"
              @change="selectedChange"
            />
          </div>
        </div>
      </div>
    </template>
  </MyDropDown>
  <iframe
    v-if="selectedKeys[0]"
    class="b--r m-b-20"
    width="350"
    height="280"
    style="background-color: #fff"
    src="/assets/html/watch.html"
    frameborder="0"
  ></iframe>
  <!-- 反馈 -->
  <FeedbackBox v-if="selectedKeys[1]" />
  <!-- 翻译 -->
  <TranslateBox v-if="selectedKeys[2]" />
  <!-- 工具集 -->
  <ToolBox v-if="selectedKeys[3]" />
  <!-- 知乎热搜 -->
  <ZhList v-if="selectedKeys[4]" />
  <!-- 微博热搜 -->
  <WbBox v-if="selectedKeys[5]" />
  <!-- 百度热搜 -->
  <BdBox v-if="selectedKeys[6]" />
</template>

<script setup>
import { ajaxGet } from '../../utils/ajax.js'
import { parseTime } from '../../utils/index.js'
const visible = ref(false)
const options = ref([
  {
    i: 'icon-shizhong',
    t: '时钟'
  },
  {
    i: 'icon-fankui',
    t: '反馈'
  },
  {
    i: 'icon-fanyiline',
    t: '翻译'
  },
  {
    i: 'icon-gongju',
    t: '工具集'
  },
  {
    i: 'icon-icon',
    t: '知乎热搜'
  },
  {
    i: 'icon-icon',
    t: '微博热搜'
  },
  {
    i: 'icon-icon',
    t: '百度热搜'
  }
])
const selectedKeys = ref([])
const weather = ref('')
function getCityWeater(city) {
  ajaxGet('https://www.5cv.top/weather/weather_mini?city=' + city).then(res => {
    weather.value =
      parseTime(+new Date(), '{m}月{d}日 星期{a} ') +
      res.data.wendu +
      '℃' +
      ' ' +
      city.replace('市', '')
  })
}
let stopTime = null
function getWeater() {
  const script = document.createElement('script')
  script.src = 'https://pv.sohu.com/cityjson?ie=utf-8'
  document.head.appendChild(script)

  script.onload = () => {
    let index = returnCitySN.cname.indexOf('省')
    const city = returnCitySN.cname.slice(index+1)
    getCityWeater(city)
    stopTime = setInterval(() => {
      getCityWeater(returnCitySN.cname)
    }, 1000 * 60 * 30)
    document.head.removeChild(script)
  }
}
onMounted(() => {
  getWeater()
  const keyCache = localStorage.getItem('selectedKeys')
  selectedKeys.value =
    (keyCache !== null && JSON.parse(keyCache)) || Array(7).fill(true)
})
onDeactivated(() => {
  clearInterval(stopTime)
})
function selectedChange() {
  localStorage.setItem('selectedKeys', JSON.stringify(selectedKeys.value))
}
function handleSwitch() {
  visible.value = !visible.value
}
</script>

<style lang="less" scoped>
.box {
  margin-left: 10px;
  width: 304px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex {
  .flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    margin-bottom: 10px;
  }
  .flex-box:hover {
    background-color: #eee;
  }
}
.weather {
  width: 350px;
  padding: 0 5px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  text-align: center;
  border-radius: 8px;
}
</style>
