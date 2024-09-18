import { franc, francAll } from 'franc';

const colors = await import('colors');
const rainbow = await import('rainbow');
const langs = await import('langs');

try{
    const input = process.argv[2]
    const langcode = (franc(input))
    if(langcode==='und'){
        console.log(("Sorry, Could not Figure it out! Try with more Sample Text").rainbow)
    }
    else{
        const language = langs.default.where("3",langcode)  
        console.log((language.name).green)
    }
    console.log(`Detected language code: ${langcode}`);
}
catch(e){
    console.log(("Some Went Wrong!!!").red)
    console.log(e)
}


