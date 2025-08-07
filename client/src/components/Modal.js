class Modal {
  constructor() {
    this._modal = document.getElementById("modal")
    this._modalBtn = document.getElementById("modal-btn")
    this._closeBtn = document.getElementById("close-btn")
    this.addEventListeners()
  }

  addEventListeners() {
    window.addEventListener("click", this.outsideClick.bind(this))
    this._modalBtn.addEventListener("click", this.open.bind(this))
    this._closeBtn.addEventListener("click", this.close.bind(this))
  }

  open() {
    this._modal.style.display = "block"
  }

  close() {
    this._modal.style.display = "none"
  }
  outsideClick(e) {
    if (e.target === this._modal) {
      this.close()
    }
  }
}

export default Modal;
