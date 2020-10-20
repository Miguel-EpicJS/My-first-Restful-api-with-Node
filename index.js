const express = require('express')
const server = express()
server.use(express.json())
const pokemon = []

server.get('/pokemon', (req, res) => {
    return res.json(pokemon)
})

server.get('/pokemon/:index', (req, res) => {
    return res.json(req.user)
})

server.put('/pokemon/:index', checkPokemonInArray,(req, res) => {
    const {
        index
    } = req.params
    const {
        name
    } = req.body

    pokemon[index] = name
    return res.json(pokemon)
})

server.delete('/pokemon/:index', (req, res) => {
    const {
        index
    } = req.params
    pokemon.splice(index, 1)

    return res.send()
})

server.post('/pokemon', checkPokemonExists,(req, res) => {
    const {
        name
    } = req.body
    pokemon.push(name)
    return res.json(pokemon)
})

function checkPokemonExists(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'geek name is required'
        });
        // middleware local que irá checar se a propriedade name foi informada corretamente,
        // caso negativo, irá retornar um erro 400 – BAD REQUEST
    }
    return next(); // se o nome for informado corretamente, a função next() chama as próximas ações
}

function checkPokemonInArray(req, res, next) {
    const geek = pokemon[req.params.index];
    if (!geek) {
        return res.status(400).json({
            error: 'geek does not exists'
        });
    } // checa se o Geek existe no array, caso negativo informa que o index não existe no array

    req.geek = geek;

    return next();
}

server.listen(3000)