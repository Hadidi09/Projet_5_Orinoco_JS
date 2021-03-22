// Variables de récupération des données du localStorage
const formContact = JSON.parse(localStorage.getItem('contact'))
const orderId = JSON.parse(localStorage.getItem('order'))
const total = JSON.parse(localStorage.getItem('total'))

//Variables d'affichage des informations de l'utilisateur
let paraOrder = document.querySelector('.order')
let firstName = document.querySelector('.firstname')
let totalcommande = document.querySelector('.lastname')
let address = document.querySelector('.address')
let email = document.querySelector('.email')

paraOrder.textContent = `Votre code de commande est: ${orderId}`
firstName.textContent = `Merci ${formContact.firstName} ${formContact.lastName}`
totalcommande.textContent = `Votre commande totale s'élève à:${total}`
address.textContent = `Vous recevrez votre commande à l'adresse: ${formContact.address} ${formContact.city}`
email.textContent = `Retrouvez les details de votre commande dans votre boite email: ${formContact.email}`

localStorage.clear()


