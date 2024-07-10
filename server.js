const express = require('express')
const pool = require('./db')
const cors = require('cors');
const port = 3000

const app = express()
app.use(cors());
app.use(express.json())


//routes
app.get('/', async (req, res) => {
    try{
        const data = await pool.query('SELECT * FROM projects')
        res.status(200).send({projects: data.rows})
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})


app.post('/', async (req, res) => {
    const{name, members, client, technology, description} = req.body
    try{
        await pool.query('INSERT INTO projects (name, members, client, technology, description) VALUES ($1, $2, $3, $4, $5)', [name, members, client, technology, description])
        res.status(200).send({message: "successfully added project"})
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        res.status(200).send({ message: "successfully deleted project" });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});


app.get('/setup', async (req, res) => {
    try{
        await pool.query('CREATE TABLE projects ( id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, members VARCHAR(255),client VARCHAR(255),technology VARCHAR(255), description TEXT)')
        res.status(200).send({message: "successfully created table"})
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.listen(port, () => console.log(`server has started on port: ${port}`))