<template>
  <div class="flag-box">
    <div class="f-s-15 flex">翻译 <div class="my-primary" @click="searchSubmit">搜索</div></div>
    <MyTextarea v-model="search" />
    <MyTextarea
      style="margin-top: 10px"
      v-model="afterSearch"
      readonly="true"
    />
  </div>
</template>

<script setup>
const search = ref('')
const afterSearch = ref('')
onMounted(() => {})
const searchSubmit = () => {
  if (['', null].includes(search.value)) return
  const obj = {
    text: search.value
      .replaceAll('\n', '')
      .replaceAll('[', '【')
      .replaceAll(']', '】')
  }
  if (obj.text === '') return
  function isEnChinois() {
    return /^[0-9\u4e00-\u9fa5]+$/.test(obj.text)
  }
  let to = isEnChinois() ? 'en' : 'zh'
  var script = document.createElement('script')
  script.src = `https://api.fanyi.baidu.com/api/trans/vip/translate?q=${
    obj.text
  }&from=auto&to=${to}&appid=20220208001077201&salt=1435660288&sign=${md5(
    `20220208001077201${obj.text}14356602880TyNp5mLYzBoZgYux3qK`
  )}&callback=getBaidu`
  document.head.appendChild(script)
  window['getBaidu'] = function (res) {
    if (!res) return
    if (res.hasOwnProperty('trans_result') && res.trans_result.length > 0) {
      afterSearch.value = res.trans_result[0].dst
    }
  }
  document.head.removeChild(script)
}
</script>

<style lang="less" scoped>
.my-primary {
  border-radius: 2px;
  font-weight: 500;
  padding: 2px 8px;
  border: 1px solid #1890ff;
  background: #1890ff;
  color: #fff;
  border-color: #1890ff;
  text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
  box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
}

.my-primary:hover {
  color: #fff;
  background-color: #40a9ff;
  border-color: #40a9ff;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.flag-box {
  border-radius: 8px;
  width: 350px;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 20px;
}
.flag-btn {
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}
</style>
