// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "theme/theme"

//To easily verify in browser console that turbo navigation is working
document.addEventListener("turbo:visit", function (event) {
    console.log("Turbo visit event");
});