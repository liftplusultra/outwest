function initRecaptcha() {
    console.log('recaptcha')
    console.log(grecaptcha)

    function recaptchaCallback() {
        // Enable the submit button
        document.getElementById('submit-button').disabled = false;
    }
    window.recaptchaCallback = recaptchaCallback;

    const recaptchaElements = document.querySelectorAll('.g-recaptcha');
    recaptchaElements.forEach(element => {
        if (!element.getAttribute('data-loaded')) {
                grecaptcha.enterprise.render(element, {
                    'sitekey': element.getAttribute('data-sitekey'),
                    'callback': element.getAttribute('data-callback'),
                    'action': element.getAttribute('data-action')
                });
                element.setAttribute('data-loaded', 'true');
        }
    });
}

document.addEventListener('DOMContentLoaded', initRecaptcha);
document.addEventListener('turbo:load', initRecaptcha); // Initial page load
document.addEventListener('turbo:frame-load', initRecaptcha); // After a form submission
