<template>
  <div
    class="search"
    :style="{
      height: !flag ? '100vh' : '100%',
      background: !flag ? 'url(' + imgSrc + ') no-repeat' : '#fff',
      backgroundSize: 'cover',
      paddingBottom: !flag ? '50vh' : '20px'
    }"
  >
    <div class="search-box">
      <MyPopver>
        <div class="select-web">
          <img :src="webLogoimageSrc" class="search-box-img" />
        </div>
        <template #content>
          <img
            @click="selectWeb"
            class="img-logo"
            src="https://images.frontendjs.com/baidu-logo.png?imageView2/2/h/60"
            alt="baidu"
          />
          <img
            @click="selectWeb"
            class="img-logo"
            src="https://images.frontendjs.com/bing-logo.png?imageView2/2/h/60"
            alt="bing"
          />
          <img
            @click="selectWeb"
            class="img-logo"
            src="https://images.frontendjs.com/google-logo.png?imageView2/2/h/60"
            alt="google"
          />
          <img
            @click="selectWeb"
            class="img-logo"
            src="https://images.frontendjs.com/github-logo.png?imageView2/2/h/60"
            alt="github"
          />
        </template>
      </MyPopver>
      <div class="search-ipt" @keyup.up="up" @keyup.down="down">
        <MyDropDown v-model="visible" :trigger="''">
          <input
            type="text"
            @compositionstart="handleKeyup"
            @compositionend="handleKeydown"
            @keyup.enter="searchSubmit"
            @focus="handleFocus"
            @input="handleSearch"
            v-model="searchStr"
          />
          <template #overlay>
            <div class="flex tankuang">
              <div
                :class="`flex-box ${
                  index === selectedKeys ? 'flex-box-active' : ''
                }`"
                v-for="(item, index) in list"
                :key="index"
                @click="handleMenuClick(index)"
              >
                {{ item }}
              </div>
            </div>
          </template>
        </MyDropDown>
        <span
          v-show="searchStr.length > 0"
          class="remove"
          title="清除"
          @click="searchStr = ''"
          >x</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ajaxGet } from '../../utils/ajax.js'
import { webSearchUrl } from '../../vendor/data.js'
import { map, find } from 'lodash-es/lodash'
import { setLocal, getLocal } from '../../utils/local'
defineProps({
  flag: {
    type: Boolean,
    default: false
  }
})
const visible = ref(false)
const searchStr = ref('')
const imgSrc = ref('')
let inputZH = false

let list = ref([])
const selectedKeys = ref(0)
const webLogoimageSrc = ref('https://www.baidu.com/favicon.ico')
const webUrl = ref('https://www.baidu.com/s?wd=')
onMounted(() => {
  const d = getLocal('bingImg')
  if (d) {
    imgSrc.value = d
  } else {
    const script = document.createElement('script')
    script.src = 'https://bing.ioliu.cn/v1?' + 'callback=getBingImg'
    document.head.appendChild(script)
    window['getBingImg'] = function (res) {
      imgSrc.value = res.data.url
      setLocal('bingImg', res.data.url)
    }
    document.head.removeChild(script)
    ajaxGet('https://39734fbc-b241-4d89-ad87-0befd655e266.bspapp.com/setAccessRecord')
  }
})
function searchSubmit() {
  if (searchStr.value) window.open(webUrl.value + searchStr.value)
}
function selectWeb(e) {
  webLogoimageSrc.value = find(webSearchUrl, i => i.name === e.target.alt).url
  webUrl.value = find(webSearchUrl, i => i.name === e.target.alt).value
}
let cacheText = ''
const handleSearch = function searchChange() {
  if (cacheText !== '' && searchStr.value === cacheText) return
  cacheText = searchStr.value
  selectedKeys.value = -1
  if (searchStr.value) {
    const script = document.createElement('script')
    script.src =
      'https://www.baidu.com/sugrec?prod=pc&wd=' +
      searchStr.value +
      '&callback=getBaiduText'
    document.head.appendChild(script)
    window['getBaiduText'] = function (res) {
      if (Array.isArray(res.g) && res.g.length > 0) {
        visible.value = true
        list.value = map(res.g, i => i.q)
      } else {
        list.value = []
      }
    }
    document.head.removeChild(script)
  } else {
    visible.value = false
  }
}

function handleMenuClick(index) {
  selectedKeys.value = index
  searchStr.value = list.value[index]
  searchSubmit()
}
function down() {
  if (inputZH) return
  let length = list.value.length - 1
  if (selectedKeys.value === length) {
    selectedKeys.value = 0
    searchStr.value = list.value[0]
  } else {
    selectedKeys.value++
    searchStr.value = list.value[selectedKeys.value]
  }
}
function up() {
  if (inputZH) return
  let length = list.value.length - 1
  if (selectedKeys.value <= 0) {
    selectedKeys.value = length
    searchStr.value = list.value[length]
  } else {
    selectedKeys.value--
    searchStr.value = list.value[selectedKeys.value]
  }
}

function handleKeyup() {
  inputZH = true
}
function handleKeydown() {
  inputZH = false
}
function handleFocus() {
  if (searchStr.value && list.value.length > 0) {
    visible.value = true
  }
}
</script>

<style lang="less" scoped>
.flex {
  padding: 4px 0 !important;
  .flex-box {
    padding: 5px 12px;
  }
  .flex-box:hover {
    background-color: #eee;
  }
  .flex-box-active {
    background-color: #e6f7ff;
    color: #1890ff;
  }
}
input {
  box-sizing: border-box;
  width: 100%;
  line-height: 44px;
  padding: 0 22px 0 5px;
  background: none;
  outline: none;
  border: none;
}
input:focus {
  border: none;
}
.search-ipt {
  position: relative;
  width: 100%;
  .remove {
    cursor: pointer;
    position: absolute;
    color: #fff;
    background-color: #ccc;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    top: 14px;
    right: 5px;
    line-height: 9px;
    text-align: center;
    vertical-align: top;
  }
}
.img-logo {
  display: block;
  width: 55px;
  margin-bottom: 10px;
}
.img-logo:last-child {
  margin-bottom: 0;
}
.select-web {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-box-img {
  width: 25px;
  height: 25px;
}
.search {
  box-shadow: 0px 0.1px 0.1px rgba(0, 0, 0, 0.016),
    0px 0.1px 0.3px rgba(0, 0, 0, 0.024), 0px 0.3px 0.5px rgba(0, 0, 0, 0.032),
    0px 0.4px 0.9px rgba(0, 0, 0, 0.039), 0px 0.8px 1.7px rgba(0, 0, 0, 0.049),
    0px 2px 4px rgba(0, 0, 0, 0.07);
  position: sticky;
  top: 0;
  z-index: 99;
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-box {
  box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 2px 4px 1px rgb(0 0 0 / 9%);
  border-radius: 10px;
  padding: 0 10px;
  background-color: #fff;
  width: 700px;
  display: flex;
  justify-content: center;
}
</style>
