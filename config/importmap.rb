# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/theme", under: "theme"
pin "validator", to: "https://ga.jspm.io/npm:validator@13.11.0/index.js"
pin "notyf", to: "https://ga.jspm.io/npm:notyf@3.10.0/notyf.es.js"
pin "swiper-bundle"
pin "trix"
pin "@rails/actiontext", to: "actiontext.esm.js"
pin "@rails/activestorage", to: "activestorage.esm.js"