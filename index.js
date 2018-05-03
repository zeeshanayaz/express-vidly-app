const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const genre = [
    {id: 1, genreName: "Genre1"},
    {id: 2, genreName: "Genre2"},
    {id: 3, genreName: "Genre3"},
    {id: 4, genreName: "Genre4"},
];

// routing to Home Page
app.get('/', (req, res) => {
    res.send('Wellcome to VIDLY Genre');
});

// Get the list of All Genre - VIDLY
app.get('/api/genre', (req, res) => {
    res.send(genre);
});

// Get specific Genre
app.get('/api/genre/:id', (req, res) => {
    const reqGenre = genre.find(g => g.id === parseInt(req.params.id));

    if(!reqGenre){
        return res.status(404).send('The required ID is not found...')
    }
    res.send(reqGenre);
});

// get query params
// app.get('/api/genre/:day/:month/:year', (req, res) => {
//     res.send(req.query);
// });

// Post function (creating Data)
app.post('/api/genre', (req, res) => {

    const {error} = validateInput(req.body);
    
    if(error){
        return res.status(404).send(error.details[0].message);
    }

    const newGenre = {
        id: genre.length+1,
        genreName: req.body.name
    };
    genre.push(newGenre);
    res.send(newGenre);
});


// Put function (Updating Data object)
app.put('/api/genre/:id', (req, res) => {
    const reqGenre = genre.find(g => g.id === parseInt(req.params.id));

    if(!reqGenre){
        return res.status(404).send('The required ID is not found...')
    }

    const {error} = validateInput(req.body);
    
    if(error){
        return res.status(404).send(error.details[0].message);
    }

    reqGenre.genreName = req.body.name;
    res.send(reqGenre);

});

// Delete Function
app.delete('/api/genre/:id', (req, res) => {
    const reqGenre = genre.find(g => g.id === parseInt(req.params.id));

    if(!reqGenre){
        return res.status(404).send('The required ID is not found...')
    }
    const index = genre.indexOf(reqGenre);
    genre.splice(index, 1);
    res.send(reqGenre);
});

app.listen(3000, () => console.log('Listening on 3000...'));

function validateInput(userInput){
    const schema = {
        name: Joi.string().min(5).required()
    };
    return Joi.validate(userInput, schema);
}