const pokemon = [
    { name: 'Bulbasaur', id: '001' },
    { name: 'Charmander', id: '004' },
    { name: 'Squirtle', id: '007' },
]

const userRoster = []

const containerDiv = document.querySelector('#container')
const newBtn = document.querySelector('#new-pokemon-btn')
const delBtn = document.querySelector('#delete-pokemon-btn')
const rosterDiv = document.querySelector('#roster')
let indicator = 0;
counter = 0;

let idFixer = (num) => {
    if (!((/\d/.test(num) || /\d\d/.test(num) || /\d\d\d/.test(num)))) {
        alert("That doesn't seem right, try again.");
        indicator++;
        return;
    }
    if (userRoster.length == 6) {
        alert("Your roster seems to be filled");
        indicator++;
    }
    if (num.length == 1) {
        return "00" + num;
    } else if (num.length == 2) {
        return "0" + num;
    } else return num;
}

// let tester = regex expression;
// let tester1 = /\d/;
// let tester2 = /\d\d/;
// let tester3 = /\d\d\d/;

const create = (elementType) => {
    return document.createElement(elementType);
}

delBtn.addEventListener('click', () => {
    if (userRoster.length > 0){
        userRoster.pop();
        console.log(userRoster);
    }
});

newBtn.addEventListener('click', async () => {
    let num = prompt('ENTER A POKEMON NUMBER')
    
    num = idFixer(num);
    console.log(indicator);
    if (indicator > 0) {
        indicator--;
        return};
   
    // let numericalNum = parseInt(num);
    console.log("this is what we're putting in" , num);
    intv = parseInt(num);



    // console.log('Number entered', num)
    let imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${num}.png`
    let dataUrl = `https://pokeapi.co/api/v2/pokemon/${intv}`
    let req = await fetch(dataUrl)
    // console.log("Request", req)

    let res = await req.json()
    let name = res.forms[0].name
    // console.log("Res Forms", res.forms);
    // console.log("Res Forms 0", res.forms[0]);
    let audioUrl = `https://play.pokemonshowdown.com/audio/cries/${name.toLowerCase()}.mp3`
    let audio = document.createElement('audio')
    let source = document.createElement('source')
    source.setAttribute('src', audioUrl)
    source.setAttribute('type', 'audio/mpeg')
    audio.append(source)
    let h3 = document.createElement('h3')
    h3.innerText = name
    let img = document.createElement('img')
    img.setAttribute('src', imgUrl)
    img.setAttribute('class', 'roster-img')
    let position = document.querySelector(`#pokemon-${userRoster.length + 1}`)
    position.addEventListener('click', () => {
        audio.play()
    })
    position.append(img, h3, audio)
    userRoster.push(num)
})

// DOM = Document Object Model
// loop over every ID
// create an HTML element
// set the HTML element values
// append HTML element to the DOM

pokemon.map((element, index) => {
    console.log(element)
    let imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${element.id}.png`
    let div = document.createElement('div') // adding a div to house the img element
    let h3 = document.createElement('h3')
    h3.innerText = element.name
    div.setAttribute('class', 'pokemon-card') // setting the class of the div
    let img = document.createElement('img') // creating the img element itself
    let audioUrl = `https://play.pokemonshowdown.com/audio/cries/${element.name.toLowerCase()}.mp3`
    let audio = document.createElement('audio')
    let source = document.createElement('source')
    source.setAttribute('src', audioUrl)
    source.setAttribute('type', 'audio/mpeg')
    audio.append(source)
    div.addEventListener('click', () => {
        console.log('audio', audioUrl)
        audio.play()
    })
    img.src = imgUrl
    div.append(img, h3, audio) // append the img element to the div
    containerDiv.append(div)
    console.log(containerDiv)
})
