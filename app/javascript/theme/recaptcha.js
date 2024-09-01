function initRecaptcha() {
    console.log('recaptcha')
    function recaptchaCallback() {
        // Enable the submit button
        document.getElementById('submit-button').disabled = false;
    }

    function recaptchaExpiredCallback() {
        // Disable the submit button
        document.getElementById('submit-button').disabled = true;
    }

    const recaptchaContainer = document.getElementById('g-recaptcha');
    if (recaptchaContainer && !recaptchaContainer.getAttribute('data-loaded')) {
        grecaptcha.enterprise.render(recaptchaContainer, {
            'sitekey': '6LdZS1cpAAAAACF7_-WohxgpCyQ_L4o4pxPI-2Gi',
            'action': 'CONTACT',
            'callback': recaptchaCallback,
            'expired-callback': recaptchaExpiredCallback
        });
        recaptchaContainer.setAttribute('data-loaded', 'true');
    }

    window.recaptchaCallback = recaptchaCallback;
    window.recaptchaExpiredCallback = recaptchaExpiredCallback;
}

window.initRecaptcha = initRecaptcha