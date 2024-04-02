import {Controller} from "@hotwired/stimulus"
import {Notyf} from 'notyf';

// Connects to data-controller="toast"
export default class extends Controller {
  static values = {
    message: String,
    type: String
  }

  connect() {
    const options = {
      duration: 5000,
      position: {x: 'right', y: 'bottom'},
      dismissible: true,
      types: [
        {
          type: 'notice',
          className: 'bg-primary',
          icon: '<i class="bi bi-info-circle"/>'
        }
      ]
    }
    window.notyf = new Notyf(options);

    const flashMessage = this.messageValue;

    if (flashMessage) {
      console.log(flashMessage);
      let type = this.typeValue;

      notyf.open({
        type: type === "alert" ? "error" : type,
        message: flashMessage
      });

    }
  }
}
