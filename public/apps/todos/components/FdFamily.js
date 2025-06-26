class FdFamily extends HTMLElement {
  constructor() {
    super()
    this.render()
    this.dom = {}
    this.dom.dialog = this.querySelector('.family-dialog')
    this.dom.title = this.querySelector('.dialog-title')
    this.dom.form = this.querySelector('.family-form')
    this.dom.nameInput = this.querySelector('.family-name')
    this.dom.descInput = this.querySelector('.family-desc')
    this.dom.submitBtn = this.querySelector('.submit-btn')
    this.dom.cancelBtn = this.querySelector('.cancel-btn')
    this.dom.closeBtn = this.querySelector('.close-btn')

    this.addEventListeners()
  }

  updateStatus(status = 'edit') {
    if(status === 'add') {
      this.dom.title.textContent = '创建家庭'
      this.dom.submitBtn.textContent = '创建家庭'
      this.clearForm()
    } else {
      this.dom.title.textContent = '编辑家庭'
      this.dom.submitBtn.textContent = '保存修改'
    }
  }

  updateFamily({ name = '', description = '' }) {
    this.dom.nameInput.value = name
    this.dom.descInput.value = description
  }

  clearForm() {
    this.dom.nameInput.value = ''
    this.dom.descInput.value = ''
  }

  open(params) {
    const family = params.family
    if(family) {
      this.updateFamily(family)
    }
    this.dom.dialog.showModal()
  }

  close() {
    this.dom.dialog.close()
  }

  addEventListeners() {
    // 表单提交
    this.dom.form.addEventListener('submit', (e) => {
      e.preventDefault()

      const formData = {
        name: this.dom.nameInput.value.trim(),
        description: this.dom.descInput.value.trim()
      }

      if(!formData.name) {
        alert('请输入家庭名称')
        return
      }

      // 触发自定义事件
      this.dispatchEvent(new CustomEvent('submit-family', {
        detail: formData
      }))
    })

    // 取消按钮
    this.dom.cancelBtn.addEventListener('click', () => {
      this.close()
    })

    // 关闭按钮
    this.dom.closeBtn.addEventListener('click', () => {
      this.close()
    })

    // 点击遮罩关闭
    this.dom.dialog.addEventListener('click', (e) => {
      if(e.target === this.dom.dialog) {
        this.close()
      }
    })

    // ESC键关闭
    this.dom.dialog.addEventListener('cancel', (e) => {
      e.preventDefault()
      this.close()
    })
  }

  render() {
    this.innerHTML = `
      <dialog class="modal family-dialog">
        <div class="modal-box w-11/12 max-w-md">
          <!-- 标题栏 -->
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-lg dialog-title">编辑家庭</h3>
            <button class="btn btn-sm btn-circle btn-ghost close-btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- 表单内容 -->
          <form class="family-form space-y-4">
            <!-- 家庭名称 -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">家庭名称 <span class="text-error">*</span></span>
              </label>
              <input 
                type="text" 
                placeholder="请输入家庭名称" 
                class="input input-bordered family-name" 
                required 
                maxlength="12"
              />
            </div>

            <!-- 家庭描述 -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">家庭描述</span>
              </label>
              <textarea 
                class="textarea textarea-bordered family-desc" 
                placeholder="请输入家庭描述（可选）"
                rows="3"
                maxlength="100"
              ></textarea>
              <label class="label">
                <span class="label-text-alt text-gray-500">最多100个字符</span>
              </label>
            </div>

            <!-- 操作按钮 -->
            <div class="modal-action">
              <button type="button" class="btn btn-ghost cancel-btn">取消</button>
              <button type="submit" class="btn btn-primary submit-btn">保存修改</button>
            </div>
          </form>
        </div>
      </dialog>
    `
  }
}

// 注册为自定义元素
customElements.define('fd-family', FdFamily, { extends: 'section' })
