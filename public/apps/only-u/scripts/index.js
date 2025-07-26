/**
 * @typedef {{ store: (name: string) => any, data: (name: string) => any }} Alpine
 * @typedef {import('dayjs').Dayjs} Dayjs
 */

document.addEventListener('alpine:init', () => {
  /** @type {Alpine} */
  const Alpine = globalThis.Alpine
  /** @type {Dayjs} */
  const now = dayjs()

  Alpine.store('common', {
    engines,
    currentEngine: engines[0],
    previewEngines: engines,
    showEngineModal: false,

    selectEngine(engine) {
      this.currentEngine = engine
      this.closeEngineModal()
    },
    clickCurrentEngine() {
      this.showEngineModal = true
    },
    closeEngineModal() {
      this.showEngineModal = false
    },
  })

  Alpine.data('headerData', () => ({
    toggleEngineModal() {
      this.$store.common.showEngineModal = !this.$store.common.showEngineModal
    }
  }))

  Alpine.data('mainData', () => ({
    value: '',
    date: now.format('MM-DD'),
    weekday: '星期' + getWeekday(now.day() - 1),

    init() {
      // 监听ESC键关闭弹窗
      document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && this.$store.common.showEngineModal) {
          this.$store.common.closeEngineModal()
        }
      })
    },
    search(e) {
      if(e.ctrlKey) return

      const splitTexts = this.value.split(' ')
      const length = splitTexts.length
      if(length > 1) {
        const maybeEngine = splitTexts[length - 1]
        const currentEngine = this.$store.common.engines.find(engine => engine.title === maybeEngine || engine.nick === maybeEngine || engine.cn === maybeEngine || engine.en === maybeEngine)
        if(currentEngine) {
          this.$store.common.currentEngine = currentEngine
          splitTexts.pop()
          return window.open(this.$store.common.currentEngine.link.replace('%keyword%', String(splitTexts).replace(/,/g, ' ')))
        }
      }
      this.normalSearch()
    },
    normalSearch() {
      window.open(this.$store.common.currentEngine.link.replace('%keyword%', this.value))
    },
  }))
})