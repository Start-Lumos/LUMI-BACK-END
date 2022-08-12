const User = require("../models/User")

module.exports = {
    async getUser(email){
        const foundUser = User.findOne({email:email})
        return foundUse
    },
    async deleteUser(email){
        const foundUser = User.findOne({email:email}).remove().exec()
        return foundUser
    },
    async updateUser(values){
        const {nome, email, imagemPerfil} = values
        const updateUser = await User.updateOne({ email:email }, { nome, email, imagemPerfil });
        return updateUser
    },
    async createUser({nome, email, imagemPerfil}){
     console.log(imagemPerfil)
        const createdUser = await User.create({nome, email, imagemPerfil:imagemPerfil||'default.png'})
        return createdUser
    }
}