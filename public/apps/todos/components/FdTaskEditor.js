class FdTaskEditor extends HTMLElement {
  constructor() {
    super()
    this.mode = 'login' // 'login' or 'register'
    this.render()
  }

  connectedCallback() {
    this.addEventListeners()
  }

  addEventListeners() {
    // 表单提交
    const editorForm = this.querySelector('#editor-form')
    if(editorForm) {
      editorForm.onsubmit = (e) => {
        e.preventDefault()
        const id = this.dataset.taskId
        const name = editorForm.name.value.trim()
        const description = editorForm.description.value
        this.dispatchEvent(new CustomEvent('submit-task', {
          detail: { id, name, description }
        }))
      }
    }

    // 删除任务
    const deleteBtn = this.querySelector('.delete-task-button')
    if(deleteBtn) {
      deleteBtn.onclick = () => {
        this.dispatchEvent(new CustomEvent('delete-task', { detail: { id: this.dataset.taskId } }))
      }
    }

    // 关闭弹窗
    const closeBtn = this.querySelector('.close-modal')
    if(closeBtn) {
      closeBtn.onclick = () => {
        this.close()
      }
    }
  }

  showError(msg) {
    const errorDiv = this.querySelector('.form-error')
    if(errorDiv) {
      errorDiv.textContent = msg
      errorDiv.style.display = 'block'
    }
  }

  hideError() {
    const errorDiv = this.querySelector('.form-error')
    if(errorDiv) {
      errorDiv.style.display = 'none'
    }
  }

  open(params = {}) {
    const task = params.task
    this.querySelector('.modal-title').textContent = task ? '编辑' : '新增'
    this.dataset.taskId = task?.id || ''
    this.querySelector('input[name="name"]').value = task?.name || ''
    this.querySelector('input[name="description"]').value = task?.description || ''
    this.querySelector('.delete-task-button').style.display = task ? 'block' : 'none'

    const modal = this.querySelector('#fd_task_modal')
    if(modal) modal.showModal()
  }

  close() {
    const modal = this.querySelector('#fd_task_modal')
    if(modal) modal.close()
  }

  render() {
    this.innerHTML = `
      <dialog id="fd_task_modal" class="modal">
        <div class="modal-box">
          <h3 class="modal-title font-bold text-lg mb-4">新增</h3>
          
          <form id="editor-form" class="space-y-4">
            <div>
              <label class="label">
                <span class="label-text">任务名称 <span class="text-error">*</span></span>
              </label>
              <input name="name" type="text" placeholder="请输入任务名称" class="input input-bordered w-full" required />
            </div>
            <div>
              <label class="label">
                <span class="label-text">任务描述</span>
              </label>
              <input name="description" type="text" placeholder="请输入任务描述" class="input input-bordered w-full" required />
            </div>
            <div class="modal-action flex flex-col items-stretch gap-2">
              <button type="submit" class="btn btn-primary">提交</button>
              <button type="button" class="btn btn-error delete-task-button">删除</button>
            </div>
          </form>

          <!-- 错误信息和公共按钮 -->
          <div class="form-error text-error mb-2" style="display:none;"></div>
          <div class="flex flex-col items-stretch gap-2 mt-4">
            <button type="button" class="btn btn-ghost close-modal">关闭</button>
          </div>
        </div>
      </dialog>
    `
  }
}

customElements.define('fd-task-editor', FdTaskEditor, { extends: 'section' })
