const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  messageOne.textContent = 'Loading ...'
  fetch(`http://localhost:3000/weather?address=${search.value}`).then(response => {
    response.json().then(data => {
      messageOne.textContent = data.forecast
      messageTwo.textContent = `longitude: ${data.long}, latitude: ${data.lat}`
    })
  })
})


