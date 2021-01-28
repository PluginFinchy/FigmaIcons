const fs = require("fs");
const sass = require('node-sass');
const iconjson = require('./icons.json')
const icons = Object.entries(iconjson)
var sizedIcons = []

if (!fs.existsSync('./dist')){
    fs.mkdirSync('./dist');
}
if (!fs.existsSync('./dist/icons')){
    fs.mkdirSync('./dist/icons');
}

icons.forEach(group => {    
let name = group[0] != "medium" ? '--'+group[0] : '' ;

Object.entries(group[1]).map(icon => {
    icon[0] += name
    sizedIcons.push([icon[0],icon[1]])
})


})



sizedIcons.forEach(icon => {
    let data = icon[1].replace('data:image/svg+xml;base64,', "");

    const contents = Buffer.from(data, 'base64');

    fs.writeFile(`./dist/icons/${icon[0]}.svg`,contents, 'utf8', (err) => {
        err ? console.log(err) : null;
    })
})


const iconScss = '.icon{\n'+ sizedIcons.map(icon => {
    return `&--${icon[0]} {\nbackground-image:url('./icons/${icon[0]}.svg')\n}`
}).join('\n') + '\n}'


 fs.writeFile(`./dist/figmaicons.scss`,iconScss, 'utf8',  (err) => {
    err ? console.log(err) : null;
    if(!err){     

    }
})

const iconMd = `Icons exported from the UI2 Figma community file\nInstall via npm \`npm install @lukefinch/figmaicons\` \n \`import figmaicons from @lukefinch/figmaicons/dist/figmaicons.css\` \n\n|Icon|Name|\n|-|-|\n`+sizedIcons.map(icon => {
    return `|![${icon[0]}](dist/icons/${icon[0]}.svg)|icon--${icon[0]}`
}).join('\n')

fs.writeFile(`readme.md`,iconMd, 'utf8',  (err) => {
    err ? console.log(err) : null;
})

sass.render({data: iconScss, outputStyle: 'expanded'}, (err,res) => {
    if(!err){
        fs.writeFile('./dist/figmaicons.css', res.css, function(err){
            if(!err){
              //file written on disk
            }
        })
    }
})

