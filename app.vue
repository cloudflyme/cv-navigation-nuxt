<template>
  <mSearch :flag="flag" />
  <main class="container-main" v-show="flag">
    <section>
      <!-- <div class="tips" v-if="tipsShow">
        <span class="text">
          <svg
            focusable="false"
            width="1em"
            height="1em"
            fill="#1890ff"
            aria-hidden="true"
            viewBox="64 64 896 896"
          >
            <path
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
            ></path>
          </svg>

          <span>温馨提示：不想要左下角小人的可以悬浮后点 x 关掉</span>
          
        </span>

        <svg
          @click="gotIt"
          focusable="false"
          class=""
          data-icon="close"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          viewBox="64 64 896 896"
        >
          <path
            d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
          ></path>
        </svg>
      </div> -->
      <hotModule />
      <webBox />

      <div
        class="fold"
        :style="{ right: visible ? '-405px' : '-40px' }"
        @click="handleFold"
      >
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :style="{
            transform: visible ? 'rotate(180deg)' : 'rotate(0)'
          }"
        >
          <path
            d="M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
    <aside v-if="visible">
      <rankingList />
    </aside>
  </main>
  <footer v-show="flag">
    <div style="margin-bottom: 10px">
      Copyright © 2021-2022 5cv.top All Rights Reserved
    </div>
    <a href="https://beian.miit.gov.cn/" target="_blank"
      >豫ICP备2022003304号-1</a
    >
  </footer>
  <a
    href="https://juejin.cn/post/7067030401444741157"
    target="_blank"
    style="font-size: 30px"
    class="iconfont icon-bangzhu"
    title="帮助"
    v-show="switchFlag"
  ></a>

  <div
    style="font-size: 22px"
    class="iconfont icon-shuangmoshiqiehuan"
    title="切换"
    v-show="switchFlag"
    :style="{ color: !flag ? '#ccc' : '#333' }"
    @click="switchBC"
  ></div>
  <iframe
    class="xiaoren"
    src="/assets/html/template.html?time=002"
    frameborder="0"
    v-if="waifuDsiplay"
  ></iframe>
</template>

<script setup>
import message from './utils/message.js'

import { goPAGE } from './utils/index.js'
const flag = ref(true)
const switchFlag = ref(true)
// const tipsShow = ref(false)
const visible = ref(false)
function switchBC() {
  flag.value = !flag.value
}

const waifuDsiplay = ref(false)

onMounted(() => {
  message.init()
  const isNull = localStorage.getItem('foldFlag')
  let tempFlag = true
  if (isNull !== null) {
    tempFlag = JSON.parse(isNull)
  }
  visible.value = tempFlag


  // const tips = localStorage.getItem('wjdHCpZ3tOXTc5gs')

  // if (!tips) {
  //   tipsShow.value = true
  // }

  let show = localStorage.getItem('waifu-dsiplay')
  if (show) {
    waifuDsiplay.value = false
  } else {
    waifuDsiplay.value = true
  }
  switchFlag.value = goPAGE() ? false : true
})

function handleFold() {
  visible.value = !visible.value
  localStorage.setItem('foldFlag', JSON.stringify(visible.value))
}

// function gotIt() {
//   tipsShow.value = false
//   localStorage.setItem('wjdHCpZ3tOXTc5gs', 'wjdHCpZ3tOXTc5gs')
// }
</script>

<style lang="less">
@import '../style/index.less';
@import '/assets/icon/iconfont.css';
.container-main {
  position: relative;
}
.text {
  svg {
    margin-right: 8px;
    position: relative;
    top: 2px;
  }
}
.tips {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000d9;
  border: 1px solid #91d5ff;
  background-color: #e6f7ff;
  padding: 8px 15px;
  word-wrap: break-word;
  border-radius: 2px;
  margin-bottom: 10px;
}
.icon-bangzhu {
  position: fixed;
  bottom: 6px;
  right: 45px;
  z-index: 100;
}
.fold {
  width: 26px;
  height: 26px;
  line-height: 32px;
  z-index: 5;
  position: absolute;
  border: 1px solid rgb(239, 239, 245);
  box-shadow: 0 2px 4px 0px rgb(0 0 0 / 6%);
  right: -40px;
  top: 7px;
  background-color: #fff;
  border-radius: 50px;
  text-align: center;
  cursor: pointer;
  svg {
    transition: transform 0.3s ease-in-out;
    width: 18px;
    height: 18px;
  }
}
footer {
  color: #909399;
  a {
    color: #909399;
  }
  height: 80px;
  padding: 10px 0;
  background-color: #fff;
  text-align: center;
}
section {
  position: relative;
  margin-right: 20px;
  width: 1080px;
}
.icon-shuangmoshiqiehuan {
  position: fixed;
  z-index: 100;
  right: 10px;
  bottom: 10px;
  font-size: 24px;
}
</style>
