if(!window.queueMacrotask) {
  window.queueMacrotask = f => setTimeout(f, 0)
}

function isNotNull(value) {
  return value !== undefined && value !== null
}

function getWeekday(index = 0) {
  return ['一', '二', '三', '四', '五', '六', '日'][index]
}