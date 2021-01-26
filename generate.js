const fs = require("fs");
const sass = require('node-sass');
const iconjson = require('./icons.json')
const icons = Object.entries(iconjson)


if (!fs.existsSync('./dist')){
    fs.mkdirSync('./dist');
}
if (!fs.existsSync('./dist/icons')){
    fs.mkdirSync('./dist/icons');
}



icons.forEach(icon => {
    let data = icon[1].replace('data:image/svg+xml;base64,', "");

    const contents = Buffer.from(data, 'base64');


    fs.writeFile(`./dist/icons/${icon[0]}.svg`,contents, 'utf8', (err) => {
        err ? console.log(err) : null;
    })
})



const iconScss = '.icon{\n'+ icons.map(icon => {
    return `&--${icon[0]} {\nbackground-image:url('./dist/icons/${icon[0]}.svg')\n}`
}).join('\n') + '\n}'


 fs.writeFile(`./dist/figmaIcons.scss`,iconScss, 'utf8',  (err) => {
    err ? console.log(err) : null;
    if(!err){     

    }
})

const iconMd = `Icons exported from the UI2 Figma community file\n\n\n|Icon|Name|\n|-|-|\n`+icons.map(icon => {
    return `|![${icon[0]}](dist/icons/${icon[0]}.svg)|icon--${icon[0]}`
}).join('\n')

fs.writeFile(`readme.md`,iconMd, 'utf8',  (err) => {
    err ? console.log(err) : null;
})

sass.render({data: iconScss, outputStyle: 'expanded'}, (err,res) => {
    if(!err){
        fs.writeFile('./dist/figmaIcons.css', res.css, function(err){
            if(!err){
              //file written on disk
            }
        })
    }
})

