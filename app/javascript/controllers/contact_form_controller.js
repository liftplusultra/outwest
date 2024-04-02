import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="contact-form"
export default class extends Controller {
  static targets = ["spinner", "nameInput", "messageInput", "emailInput", "phoneInput"]

  connect() {
    this.element.addEventListener("turbo:submit-start", this.validateAndSubmit.bind(this));
  }

  validateAndSubmit(event) {
    if (event) event.preventDefault()
    this.showSpinner()
    let valid = this.validateForm()
    if (valid) this.requestSubmit()
  }

  showSpinner() {
    // Hide the form show the spinner
  }

  hideSpinner() {
    // Hide the spinner show the form
  }

  validateForm() {

  }
}
