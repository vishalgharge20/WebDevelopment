//URL: https://api.tvmaze.com/search/shows?q=girls


const form = document.querySelector('#form')
form.addEventListener('submit',async function (e) {
    e.preventDefault()
    const searchedWord = form.elements.query.value
    const config = { params:{q:searchedWord,rating:8}}
    const result = await axios.get(`https://api.tvmaze.com/search/shows`,config)
    //console.log(result.data)
    console.log(result.data[0].show.image.medium)

    // // create Image
    // const img = document.createElement('img')
    // img.src = (result.data[0].show.image.medium)
    // document.body.append(img)
    makeImages(result.data)
    form.elements.query.value = ''

})

function makeImages(shows){
        // remove exixting images
        const existingImages = document.querySelectorAll('img')
        for(let img of existingImages){
            img.remove()
        }
        // create Image
        for(let res of shows){
            if(res.show.image){
                const img = document.createElement('img')
                img.src = (res.show.image.medium)
                document.body.append(img)
            }

        }
}






