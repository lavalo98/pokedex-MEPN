import express from 'express'
import path from 'path'
import axios from 'axios'
import bodyParser from 'body-parser'
import Pokedex from 'pokedex-promise-v2';

const __dirname = path.resolve();

// Create app
const app = express()

const P = new Pokedex()

var offset = 0

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Set pug as view engine, "views" as location for .pug files
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//Sets up use for .css files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    offset = 0
    var pokemonNameArray = new Array()
    const interval = {
        limit: 12,
        offset: offset
    }
    P.getPokemonsList(interval)
        .then(async (response) => {
            await response.results.forEach(pokemon => {
                pokemonNameArray.push(pokemon.name)
            });
            P.getPokemonByName(pokemonNameArray) // with Promise
                .then((fullList) => {
                    console.log(fullList);
                    res.render('home', {pokemonList : fullList})
                })
                .catch((error) => {
                    console.log('There was an ERROR: ', error);
                });
        })
})

app.get('/next', (req, res) => {
    if(offset <= 888){
        offset += 12
    }
    var pokemonNameArray = new Array()
    const interval = {
        limit: 12,
        offset: offset
    }
    P.getPokemonsList(interval)
        .then(async (response) => {
            await response.results.forEach(pokemon => {
                pokemonNameArray.push(pokemon.name)
            });
            P.getPokemonByName(pokemonNameArray) // with Promise
                .then((fullList) => {
                    console.log(fullList);
                    res.render('home', {pokemonList : fullList})
                })
                .catch((error) => {
                    console.log('There was an ERROR: ', error);
                });
        })
})

app.get('/prev', (req, res) => {
    if(offset >= 12){
        offset -= 12
    }
    var pokemonNameArray = new Array()
    const interval = {
        limit: 12,
        offset: offset
    }
    P.getPokemonsList(interval)
        .then(async (response) => {
            await response.results.forEach(pokemon => {
                pokemonNameArray.push(pokemon.name)
            });
            P.getPokemonByName(pokemonNameArray) // with Promise
                .then((fullList) => {
                    console.log(fullList);
                    res.render('home', {pokemonList : fullList})
                })
                .catch((error) => {
                    console.log('There was an ERROR: ', error);
                });
        })
})

app.listen(80, () => console.log("Listening on port 80"))