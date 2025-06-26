class FdAccount extends HTMLElement {
  constructor() {
    super()
    this.mode = 'login' // 'login' or 'register'
    this.render()
  }

  connectedCallback() {
    this.addEventListeners()
  }

  addEventListeners() {
    // 切换登录/注册
    this.querySelectorAll('.toggle-mode').forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault()
        this.mode = this.mode === 'login' ? 'register' : 'login'
        this.updateMode() // 只更新显隐，不重新渲染
      }
    })

    // 登录表单提交
    const loginForm = this.querySelector('#login-form')
    if(loginForm) {
      loginForm.onsubmit = (e) => {
        e.preventDefault()
        const username = loginForm.username.value.trim()
        const password = loginForm.password.value
        this.dispatchEvent(new CustomEvent('login', {
          detail: { username, password }
        }))
      }
    }

    // 注册表单提交
    const registerForm = this.querySelector('#register-form')
    if(registerForm) {
      registerForm.onsubmit = (e) => {
        e.preventDefault()
        const username = registerForm.username.value.trim()
        const password = registerForm.password.value
        const password2 = registerForm.password2.value
        if(password !== password2) {
          this.showError('两次输入的密码不一致')
          return
        }
        this.dispatchEvent(new CustomEvent('signup', {
          detail: { username, password }
        }))
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

  updateMode() {
    // 更新标题
    const title = this.querySelector('.modal-title')
    if(title) {
      title.textContent = this.mode === 'login' ? '登录' : '注册'
    }

    // 显隐表单
    const loginForm = this.querySelector('#login-form')
    const registerForm = this.querySelector('#register-form')

    if(this.mode === 'login') {
      loginForm.style.display = 'block'
      registerForm.style.display = 'none'
    } else {
      loginForm.style.display = 'none'
      registerForm.style.display = 'block'
    }

    // 更新切换按钮文字
    const toggleBtn = this.querySelector('.toggle-mode')
    if(toggleBtn) {
      toggleBtn.textContent = this.mode === 'login' ? '没有账号？注册' : '已有账号？登录'
    }

    // 隐藏错误信息
    this.hideError()
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

  open() {
    const modal = this.querySelector('#fd_account_modal')
    if(modal) modal.showModal()
  }

  close() {
    const modal = this.querySelector('#fd_account_modal')
    if(modal) modal.close()
  }

  render() {
    this.innerHTML = `
      <dialog id="fd_account_modal" class="modal">
        <div class="modal-box">
          <h3 class="modal-title font-bold text-lg mb-4">${this.mode === 'login' ? '登录' : '注册'}</h3>
          
          <!-- 登录表单 -->
          <form id="login-form" class="space-y-4" style="display: ${this.mode === 'login' ? 'block' : 'none'}">
            <div>
              <label class="label">
                <span class="label-text">用户名</span>
              </label>
              <input name="username" type="text" placeholder="请输入用户名" class="input input-bordered w-full" required />
            </div>
            <div>
              <label class="label">
                <span class="label-text">密码</span>
              </label>
              <input name="password" type="password" placeholder="请输入密码" class="input input-bordered w-full" required />
            </div>
            <div class="modal-action flex flex-col items-stretch gap-2">
              <button type="submit" class="btn btn-primary">登录</button>
            </div>
          </form>

          <!-- 注册表单 -->
          <form id="register-form" class="space-y-4" style="display: ${this.mode === 'register' ? 'block' : 'none'}">
            <div>
              <label class="label">
                <span class="label-text">用户名</span>
              </label>
              <input name="username" type="text" placeholder="请输入用户名" class="input input-bordered w-full" required />
            </div>
            <div>
              <label class="label">
                <span class="label-text">密码</span>
              </label>
              <input name="password" type="password" placeholder="请输入密码" class="input input-bordered w-full" required />
            </div>
            <div>
              <label class="label">
                <span class="label-text">重复密码</span>
              </label>
              <input name="password2" type="password" placeholder="请再次输入密码" class="input input-bordered w-full" required />
            </div>
            <div class="modal-action flex flex-col items-stretch gap-2">
              <button type="submit" class="btn btn-primary">注册</button>
            </div>
          </form>

          <!-- 错误信息和公共按钮 -->
          <div class="form-error text-error mb-2" style="display:none;"></div>
          <div class="flex flex-col items-stretch gap-2 mt-4">
            <button type="button" class="btn btn-ghost toggle-mode">
              ${this.mode === 'login' ? '没有账号？注册' : '已有账号？登录'}
            </button>
            <button type="button" class="btn btn-ghost close-modal">关闭</button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>关闭</button>
        </form>
      </dialog>
    `
  }
}

customElements.define('fd-account', FdAccount, { extends: 'section' })
