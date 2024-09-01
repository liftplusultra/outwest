import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="contact-form"
export default class extends Controller {
  static targets = ["spinner", "nameInput", "messageInput", "emailInput", "phoneInput"]

  connect() {
    setTimeout(() => {
      window.initRecaptcha()
    }, 500)
  }
}
