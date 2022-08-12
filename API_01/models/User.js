const mongoose = require('mongoose')

const User = mongoose.model('User',{
   nome: String,
   sobrenome: String,
   email: String,
   cpf: String,
   senha: String,
   dataNasc: String,
   imagemPerfil: String,
   celular: String
})

module.exports = User

const insert = async (collection, document) => {
   const insertResult = await _db.collection(collection.find)({}).insertOne(document)
   return insertResult
}
const multer = require("multer")