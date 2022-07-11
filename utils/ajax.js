export const ajaxGet = (url, data, headers) => {
  if (data) {
    let paramsArray = []
    //拼接参数
    Object.keys(data).forEach(key => paramsArray.push(key + '=' + data[key]))
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&')
    } else {
      url += '&' + paramsArray.join('&')
    }
  }
  return fetch(url, { headers }).then(response => {
    return response.json()
  })
}

export const ajaxPost = (url, data, headers) => {
  return fetch(url, {
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  }).then(response => {
    return response.json()
  })
}
