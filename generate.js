const fs = require("fs");
const iconjson = require('./icons.json')

const icons = Object.entries(iconjson)

icons.forEach(icon => {
    let data = icon[1].replace('data:image/svg+xml;base64,', "");

    const contents = Buffer.from(data, 'base64');


    fs.writeFile(`./icons/${icon[0]}.svg`,contents, 'utf8', (err) => {
        err ? console.log(err) : null;
    })
})



const iconScss = '.icon{\n'+ icons.map(icon => {
    return `&--${icon[0]} {\nbackground-image:url('./icons/${icon[0]}.svg')\n}`
}).join(';\n') + '\n}'


 fs.writeFile(`figmaIcons.scss`,iconScss, 'utf8',  (err) => {
    err ? console.log(err) : null;
})

const iconMd = `|Icon|Name|\n|-|-|\n`+icons.map(icon => {
    return `|   icon--${icon[0]}| ![${icon[0]}](icons/${icon[0]})`
}).join('\n')

fs.writeFile(`readme.md`,iconMd, 'utf8',  (err) => {
    err ? console.log(err) : null;
})