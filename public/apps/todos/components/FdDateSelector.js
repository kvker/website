class FdDateSelector extends HTMLElement {
  constructor() {
    super()
    this.selectedDate = null // 当前选中的日期
    this.placeholder = this.getAttribute('placeholder') || 'Pick a date' // 占位符文本
    this.render()
  }

  connectedCallback() {
    this.addEventListeners()
  }

  // 对外暴露的获取日期方法
  getDate() {
    return this.selectedDate
  }

  // 对外暴露的设置日期方法
  updateDate(date) {
    this.selectedDate = date
    this.dispatchDateChangeEvent()
  }

  // 触发日期变化事件
  dispatchDateChangeEvent() {
    this.dispatchEvent(new CustomEvent('change-date', {
      detail: {
        date: this.selectedDate
      }
    }))
  }

  addEventListeners() {
    // 监听 calendar-date 组件的变化事件
    const dateInput = this.querySelector('input[type="date"]')
    dateInput.addEventListener('change', (e) => {
      e.target.value && this.updateDate(e.target.value)
    })
  }

  render() {
    this.innerHTML = `
      <style>
        input[type="date"] {
          width: 100%;
        }
      </style>
      <input type="date" class="input input-bordered" />
    `
  }
}

// 注册为自定义元素
customElements.define('fd-date-selector', FdDateSelector, { extends: 'section' })