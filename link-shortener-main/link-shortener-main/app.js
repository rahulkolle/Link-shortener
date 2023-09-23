// Init
const shortenerForm = document.getElementById('shortener__form')
const shortenerSubmit = document.getElementById('shortener__submit')
const shortenerResults = document.getElementById('shortener__results')
const removeButton = document.getElementById('shortener__remove')
const longUrlField = document.getElementById('shortener__input')
const shortUrlField = document.getElementById('result__link')

// Shorten url via Tinyurl.com
function shortenUrl(longUrl) {
    fetch('https://api.tinyurl.com/create', {
        method: 'POST',
        headers: {
            'authorization': 'Bearer dVbsHiUwPxMbgsznx2EvPXRkG9DiHvyBU1mQdWgtUI6LlgB7aS8aMjp2X5aJ',
            'content-type': 'application/json',
            'accept': 'application/json',
        },
        body: JSON.stringify({
            url: longUrl
        })
    })
    .then((response) => response.json())
    .then(response => {
        let shortUrl = response.data.tiny_url

        shortenerResults.innerHTML = `
        <div id="result">
            <div id="result__link" class="result-link"><a href="${shortUrl}" target="_blank">${shortUrl}</a></div>
            <div class="result__buttons">
                <button class="button__qr" onclick="generateQRCode('${shortUrl}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5.33331 18.6667V18.68M5.33331 5.33337V5.34671M18.6666 5.33337V5.34671M18.6666 14.6667H14.6666V18.6667M22.6666 14.6667V14.68M14.6666 22.6667H18.6666M18.6666 18.6667H22.6666V22.6667M1.33331 2.66671C1.33331 2.31309 1.47379 1.97395 1.72384 1.7239C1.97389 1.47385 2.31302 1.33337 2.66665 1.33337H7.99998C8.3536 1.33337 8.69274 1.47385 8.94279 1.7239C9.19284 1.97395 9.33331 2.31309 9.33331 2.66671V8.00004C9.33331 8.35366 9.19284 8.6928 8.94279 8.94285C8.69274 9.1929 8.3536 9.33337 7.99998 9.33337H2.66665C2.31302 9.33337 1.97389 9.1929 1.72384 8.94285C1.47379 8.6928 1.33331 8.35366 1.33331 8.00004V2.66671ZM14.6666 2.66671C14.6666 2.31309 14.8071 1.97395 15.0572 1.7239C15.3072 1.47385 15.6464 1.33337 16 1.33337H21.3333C21.6869 1.33337 22.0261 1.47385 22.2761 1.7239C22.5262 1.97395 22.6666 2.31309 22.6666 2.66671V8.00004C22.6666 8.35366 22.5262 8.6928 22.2761 8.94285C22.0261 9.1929 21.6869 9.33337 21.3333 9.33337H16C15.6464 9.33337 15.3072 9.1929 15.0572 8.94285C14.8071 8.6928 14.6666 8.35366 14.6666 8.00004V2.66671ZM1.33331 16C1.33331 15.6464 1.47379 15.3073 1.72384 15.0572C1.97389 14.8072 2.31302 14.6667 2.66665 14.6667H7.99998C8.3536 14.6667 8.69274 14.8072 8.94279 15.0572C9.19284 15.3073 9.33331 15.6464 9.33331 16V21.3334C9.33331 21.687 9.19284 22.0261 8.94279 22.2762C8.69274 22.5262 8.3536 22.6667 7.99998 22.6667H2.66665C2.31302 22.6667 1.97389 22.5262 1.72384 22.2762C1.47379 22.0261 1.33331 21.687 1.33331 21.3334V16Z" stroke="#FF8675" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button id="shortener__copy" class="button button-primary" onclick="copyLink('${shortUrl}')">Copy</button>
                <button id="shortener__remove" class="button__remove" onclick="removeLink()"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        </div>
        `
    })
    // Error codes
    .catch(error => {
        switch(error.code){
          case 1:
            alert('App is no longer authorized')
            break;
          case 5:
            alert('Invalid URL')
            break;
          default:
            alert('Something went wrong, please try again later')
            break;
        }
      })
}

// Shorten URL Button
shortenerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let longUrl = longUrlField.value
  
    if (longUrl != "") {
        shortenUrl(longUrl)
        shortenerForm.reset()
    } else {
        const alert = document.getElementById('alert')
        alert.classList.add('alert-active')
        alert.innerText = 'Insert a link first!'
    }
  })

// Remove alert on shorten button
longUrlField.addEventListener('click', () => {
    const alert = document.getElementById('alert')
    if(alert.classList.contains('alert-active')) {
        alert.classList.remove('alert-active')
    }
})

// Copy short url
function copyLink(shortUrl) {
    navigator.clipboard.writeText(shortUrl)
}

// Remove short url
function removeLink() {
    shortenerResults.innerHTML = ''
}

// Generate and download QR code
function generateQRCode(shortUrl) {
    const qrCodeLink = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=10&data=' + shortUrl
    window.open(qrCodeLink, '_blank')
}