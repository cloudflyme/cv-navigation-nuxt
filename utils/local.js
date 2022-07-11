import { ajaxPost } from './ajax.js'

function expireTime() {
  const date = new Date()
  const y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate()
  return Math.trunc(+new Date(`${y}-${m}-${d} 23:59:59`) / 1000)
}
function nowTime() {
  return Math.trunc(+new Date() / 1000)
}
// 存值 当天有效
export function setLocal(key, value) {
  if (!key && !value) return null
  const obj = {
    value: value,
    expire: expireTime() // 当天最后一秒得时间戳
  }
  localStorage.setItem(key, JSON.stringify(obj))
}
// 取值
export function getLocal(key) {
  if (!key) return null
  const getData = localStorage.getItem(key)
  if (getData === null) return null
  const d = JSON.parse(getData)
  if (d.hasOwnProperty('expire') && nowTime() < d.expire) {
    return d.value
  } else {
    localStorage.removeItem(key)
    return null
  }
}

// 上传访问次数取值
export function getUploadData() {
  const getData = localStorage.getItem('record')
  if (getData) {
    const d = JSON.parse(getData)
    if (d.hasOwnProperty('expire') && nowTime() > d.expire) {
      ajaxPost('https://39734fbc-b241-4d89-ad87-0befd655e266.bspapp.com/updateHotList', d.value).then(() => {
        localStorage.removeItem('record')
      })
    }
  }
}
