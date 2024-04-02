import { Controller } from "@hotwired/stimulus"
import validator from "validator";

// Connects to data-controller="validate-form"
// To enable, add to forms: data: {controller: "validate-form"}
// To validate input, add to inputs: data: {validate_form_target: "input", validate_type: "Required", validate_msg: "Optional"}
export default class extends Controller {
  static targets = ["input", "form", "submitButton"];
  static values = {spinner: Boolean}

  connect() {
  }

  validateAndSubmit(event) {
    // Disable button and preventDefault
    this.submitButtonTarget.disabled = true;
    if (event) event.preventDefault()

    // Show spinner if present
    if (this.spinnerValue) this.showSpinner()

    // Validate
    let valid = this.validateForm()

    if (valid) {
      // Valid, submit the form
      this.submit()
    } else {
      // Invalid, hide spinner and enable the button again
      if (this.spinnerValue) this.hideSpinner()
      this.submitButtonTarget.disabled = false;
    }
  }

  showSpinner() {
    let spinner = document.getElementById("spinner")
    spinner.classList.remove("d-none");
    spinner.classList.add("fade-in");
  }

  hideSpinner() {
    let spinner = document.getElementById("spinner")
    spinner.classList.add("d-none");
    spinner.classList.remove("fade-in");
  }

  submit() {
    this.formTarget.requestSubmit()
  }

  validateForm() {
    let formIsValid = true;

    this.inputTargets.forEach((input) => {
      if (input.hidden) return

      const validateType = input.dataset.validateType
      const inputValue = this.valueByType(input, validateType)

      // Only validate inputs with data-validate-type="type"
      if (validateType) {
        if (!this.validateByType(inputValue, validateType)) {
          // Prevent submitting form since something is invalid
          formIsValid = false;
          // Clear error messages when the user starts typing
          input.addEventListener("input", () => {
            input.classList.remove("is-invalid");
          });
          // Add html to display errors
          this.addInvalidFeedbackHtml(input);
          // Add class to display error
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      }
    });

    return formIsValid
  }

  valueByType(input, validateType) {
    switch (validateType) {
      case "checkbox":
        return input.checked
    }

    return input.value
  }

  validateByType(value, type) {
    switch (type) {
      case "phone":
        return validator.isMobilePhone(value, ["en-US"]);
      case "text":
        return value.length > 1
      case "number":
        return value !== '' && !isNaN(value) && !isNaN(parseFloat(value));
      case "select":
        // Just make sure something is selected.
        return value.length
      case "password":
        return value.length >= 8
      case "email":
        return value.includes("@") && value.includes(".")
      case "checkbox":
        return value === true
    }
  }

  addInvalidFeedbackHtml(input) {
    let existingInvalidFeedback = input.dataset.validated === "validated";

    if (!existingInvalidFeedback) {
      input.dataset.validated = "validated"
      let msg = input.dataset.validateMsg || "Please add a valid value.";
      let newHTML = `<div class="invalid-feedback">${msg}</div>`;

      let lastSibling = input;
      while (lastSibling.nextElementSibling) {
        lastSibling = lastSibling.nextElementSibling;
      }

      lastSibling.insertAdjacentHTML("afterend", newHTML);
    }
  }
}