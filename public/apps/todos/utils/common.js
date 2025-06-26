window.http = {
  headers: {
    session: JSON.parse(localStorage.getItem('userinfo'))?.sessionToken,
    'content-type': 'application/json;utf=8',
  },
  fetch(path, method, data) {
    const options = {
      method,
      headers: this.headers
    }
    if(method === 'POST' || method === 'PUT') {
      options.body = JSON.stringify(data)
    }
    return fetch('/api' + path, options).then(res => {
      if(res.status >= 200 && res.status < 300) {
        return res.json()
      } else {
        return res.json().then(error => {
          console.error(error)
          throw error.error || error
        })
      }
    }).then(json => {
      if(json.error) {
        throw json.error
      }
      return json
    })
  },
  get(path) {
    return this.fetch(path, 'GET')
  },
  post(path, data) {
    return this.fetch(path, 'POST', data)
  },
  put(path, data) {
    return this.fetch(path, 'PUT', data)
  },
  delete(path) {
    return this.fetch(path, 'DELETE')
  }
}

window.statusMap = function(status) {
  return {
    init: '初始化',
    loading: '加载中...',
    empty: '暂无数据',
    error: '失败',
    success: '成功',
    login: '需要登录'
  }[status] || '未知状态'
}