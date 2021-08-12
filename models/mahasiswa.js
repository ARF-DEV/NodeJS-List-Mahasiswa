const mongoose = require('mongoose');


const mahasiswaSchema = new mongoose.Schema({
    name: { type: String, default: null },
    nim: { type: String, unique: true },
    prodi: { type: String, default: null },
})

module.exports = mongoose.model('mahasiswa', mahasiswaSchema);