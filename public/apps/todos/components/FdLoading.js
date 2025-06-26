class FdLoading extends HTMLElement {
  constructor() {
    super()
    this.render()
    this.dom = {}
    this.dom.dialog = this.querySelector('dialog')
  }

  static get observedAttributes() {
    return ['show']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(name === 'show' && newValue === 'true') {
      this.open()
    } else {
      this.close()
    }
  }

  open() {
    this.dom.dialog.showModal()
  }

  close() {
    this.dom.dialog.close()
  }

  render() {
    this.innerHTML = `
      <style>
        @layer fullscreen {
          .loading-container {
            position: fixed;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
      </style>
      <dialog>
        <div class="loading-container">
          <span class="loading loading-dots loading-xl"></span>
        </div>
      </dialog>
    `
  }
}

customElements.define('fd-loading', FdLoading, { extends: 'section' })