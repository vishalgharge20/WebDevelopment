
let url = "https://cat-fact.herokuapp.com/facts"

async function getFacts(){
    console.log("Getting data.......")
    let response = await fetch(url);
    console.log(response); // JSON format
    let data =  await response.json();
    console.log(data[0].text) // object format
}

