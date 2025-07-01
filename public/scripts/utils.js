if(!window.queueMacrotask) {
  window.queueMacrotask = f => setTimeout(f, 0)
}