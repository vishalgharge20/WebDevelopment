
let text = document.querySelector('li.toclevel-1.tocsection-2 .toctext')
text.innerText = ("Char")

let h1 = document.querySelector('h1')
// h1.style.color = 'green'
console.log(window.getComputedStyle(h1).color)

h1.classList.add('purple')

h1.classList.toggle('purple')


let logo = document.createElement('img')

logo.src ='https://www.cityguide-dubai.com/fileadmin/_processed_/3/3/csm_img-worlds-of-adventures-teaser_40e4184da1.jpg'

document.body.appendChild(logo)

logo.classList.add('square')