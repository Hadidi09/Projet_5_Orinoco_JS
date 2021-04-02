const validationFirstName = (inputFirstName) => {
    let regFirstName = new RegExp('^[a-zA-Z]{2,25}$')

    if (regFirstName.test(inputFirstName.value)) {
        inputFirstName.classList.remove('text-danger')
        inputFirstName.classList.add('text-success')
    } else {
        inputFirstName.classList.remove('text-success')
        inputFirstName.classList.add('text-danger')
    }
}

const validationAddress = (inputAddress) => {
    let regAddress = new RegExp('^[0-9]{1,3}\\s[a-z\\s]{3,40}$')

    if (regAddress.test(inputAddress.value)) {
        inputAddress.classList.remove('text-danger')
        inputAddress.classList.add('text-success')
    } else {
        inputAddress.classList.remove('text-success')
        inputAddress.classList.add('text-danger')
    }
}
const validationCity = (inputCity) => {
    let regCity = new RegExp('^[a-zs]{3,25}$')

    if (regCity.test(inputCity.value)) {
        inputCity.classList.remove('text-danger')
        inputCity.classList.add('text-success')
    } else {
        inputCity.classList.remove('text-success')
        inputCity.classList.add('text-danger')
    }
}

const validationEmail = (inputEmail) => {
    let regEmail = new RegExp('^[a-z0-9_-]+@[a-z]+.[a-z]{2,3}$')

    if (regEmail.test(inputEmail.value)) {
        inputEmail.classList.remove('text-danger')
        inputEmail.classList.add('text-success')
    } else {
        inputEmail.classList.remove('text-success')
        inputEmail.classList.add('text-danger')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    let firstName = document.getElementById('firstName')
    let lastName = document.getElementById('lastName')
    let address = document.getElementById('adresse')
    let city = document.getElementById('city')
    let email = document.getElementById('email')

    firstName.addEventListener('change', () => {
        validationFirstName(firstName)
    })
    lastName.addEventListener('change', () => {
        validationFirstName(lastName)
    })
    address.addEventListener('change', () => {
        validationAddress(address)
    })
    city.addEventListener('change', () => {
        validationCity(city)
    })
    email.addEventListener('change', () => {
        validationEmail(email)
    })
})
