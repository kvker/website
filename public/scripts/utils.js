if(!window.queueMacrotask) {
  window.queueMacrotask = f => setTimeout(f, 0)
}

function isNotNull(value) {
  return value !== undefined && value !== null
}