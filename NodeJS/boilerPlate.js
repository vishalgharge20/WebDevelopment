
const fs = require('fs');

// Create ./tmp/a/apple, regardless of whether ./tmp and ./tmp/a exist.
// fs.mkdir('Dogs', { recursive: true }, (err) => {
//     console.log("In the Callback");
//     if (err) throw err;
// });
// console.log("i come after mkdir")

// fs.mkdirSync('Cats')
// console.log("i come after mkdir")

const folderName = process.argv[2] || 'project'  // it will take input fron 2nd index or default name is project 

try{
    fs.mkdirSync(folderName)
    fs.writeFileSync(`${folderName}/index.html`,'')
    fs.writeFileSync(`${folderName}/app.js`,'')
    fs.writeFileSync(`${folderName}/styles.css`,'')
}
catch(e){
    console.log("Something Went Wrong!!!")
    console.log(e)
}

