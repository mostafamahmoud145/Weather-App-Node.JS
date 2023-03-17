const inputEle = document.querySelector('input')
const formEle = document.querySelector('form')
const message_1 = document.querySelector('#first_message')
const message_2 = document.querySelector('#second_message')


formEle.addEventListener('submit', (e) => {
    e.preventDefault()
    message_2.textContent = ''
    message_1.textContent = 'loading...'
    const address = inputEle.value
    fetch('http://localhost:3000/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message_1.textContent = data.error
            }
            else {
                message_1.textContent = data.place_name
                message_2.textContent = "Temperature: " + data.temp
            }
        })
    })
})
