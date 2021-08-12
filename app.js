//Memproses semua variable yang ada di dalam .env 
require('dotenv').config();

//Import library
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const Mahasiswa = require('./models/mahasiswa')

//Mengubungkan Server dengan Databse
const { DB_URI } = process.env;
mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('Connected to DB!');
    })
    .catch((err) => {
        console.log(`Unable to connect the DB\nERROR ${err}`)
    })

//Menspesifikasikan view engine yang digunakan dan tempat penyimpanannya
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//HTTP request Body Parse
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Provide Static File
app.use('/public', express.static(path.join(__dirname, 'public')))

//Default Route menampilkan home.ejs didalam folder /views
app.get('/', async (req, res) => {
    const list_mahasiswa = await Mahasiswa.find({});
    console.log(list_mahasiswa);
    res.render('home', { list_mahasiswa });
})

//Merender create.ejs didalam folder /views
app.get('/add', (req, res) => {
    res.render('create');
})

// save new mahasiswa data to database
app.post('/api/add', async (req, res) => {
    const { name, nim, prodi } = req.body;
    if (!(name && nim && prodi))
    {
        return res.status(400).send("All field required");
    }
    //Create and save model
    try 
    {
        const mhs = new Mahasiswa({
            name,
            nim,
            prodi
        });
        await mhs.save()
        res.status(200).send("data saved!");
    }
    catch(err)
    {
        res.status(400).send(`Error : ${err}`);
    }
})

// menghapus data mahasiswa pada database berdasarkan id
app.delete('/api/delete/:id', async (req, res) => {
    try
    {
        await Mahasiswa.deleteOne({_id : req.params.id})
        return res.status(200).send('SUCCESS');
    }
    catch(err)
    {
        return res.status(400).send(`Failed to delete\nERROR: ${err}`);
    }
})

// server berjalan pada localhost:5001
app.listen(5001, () => {
    console.log('Listening at port 5001');
})