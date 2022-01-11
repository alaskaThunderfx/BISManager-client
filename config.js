export let apiUrl
const apiUrls = {
    production: '',
    development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
    apiUrl = apiUrls.development
} else {
    apiUrl = apiUrls.production
}
