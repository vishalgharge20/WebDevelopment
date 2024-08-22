// url = https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

const cont = document.querySelector('#container')

// const newImg = document.createElement('img')
// newImg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
// cont.append(newImg)


for(i=1;i<200;i++){
    
    let Pokemondiv = document.createElement('div')
    Pokemondiv.classList.add('pokemon')
    
    const newImg = document.createElement('img')
    newImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
    newImg.classList.add('pokemonImg')
    
    let labelspan = document.createElement('span')
    labelspan.innerText = `#${i}`
    
    Pokemondiv.appendChild(newImg)
    Pokemondiv.appendChild(labelspan)

    cont.append(Pokemondiv)
}