import {DirectUpload} from "@rails/activestorage"

class Uploader {
    constructor(file, url) {
        this.upload = new DirectUpload(file, url, this)
        this.progressBar = document.querySelector('.progress-bar')
        this.preview = document.querySelector('#preview');
    }

    uploadFile(file, input) {
        const spinner = document.querySelector("#loading-spinner")
        if (spinner) spinner.hidden = false

        this.upload.create((error, blob) => {
            if (error) {
                console.log(error)
            } else {
                this.addHiddenFormField(input, blob.signed_id)
                this.updatePreview(file)
            }
            if (spinner) spinner.hidden = true
        })

    }

    addHiddenFormField(input, signedId) {
        const hiddenField = document.createElement('input')
        hiddenField.setAttribute('type', 'hidden')
        hiddenField.setAttribute('value', signedId)
        hiddenField.name = input.name
        document.querySelector('form').appendChild(hiddenField)
    }

    updatePreview(file) {
        if (this.preview && file.type.startsWith('image/')) {
            const reader = new FileReader();
            const preview = this.preview

            reader.onload = function(event) {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.classList.add('rounded');
                img.classList.add('img-fluid');
                // img.classList.add('page-image');
                preview.innerHTML = ''; // Clear previous content if any
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    }

    directUploadWillStoreFileWithXHR(request) {
        if (!this.progressBar) return

        this.progressBar.style.width = '0%'
        request.upload.addEventListener("progress",
            event => this.directUploadDidProgress(event))
    }

    directUploadDidProgress(event) {
        if (!this.progressBar) return

        const progress = (event.loaded / event.total) * 100
        console.log(progress)
        this.progressBar.style.width = `${progress}%`
    }
}

function handleDLUpload() {
    const input = document.querySelector('input[type=file]')

    if (input) {
        input.addEventListener('change', (event) => {
            const file = event.target.files[0]
            const uploader = new Uploader(file, input.dataset.directUploadUrl)
            uploader.uploadFile(file, input)
        })
    }
}

document.addEventListener('turbo:load', handleDLUpload);
document.addEventListener('turbo:submit-end', handleDLUpload);