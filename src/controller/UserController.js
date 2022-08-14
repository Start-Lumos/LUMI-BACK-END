const User = require('../models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    async index(res) {
        const user = await User.find();
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json({user});
        }
    },
    async create(req, res) {

        const { userFirstName, userLastName, userEmail, userPassword, userCPF, userDTNasc, userPhone, toggleButton, userServico,userServDescricao, userServModalidade, userCity, userState } = req.body;
        let data = {};
        let user = await User.findOne({ userEmail });
        let userVerifyCPF = await User.findOne({ userCPF });
        if (!user && !userVerifyCPF) {

            data = { userFirstName, userLastName, userEmail, userPassword, userCPF, userDTNasc, userPhone, toggleButton, userServico,userServDescricao, userServModalidade, userCity, userState };
            user = await User.create(data);

            return res.status(201).json(user);

        } else {
            return res.status(500).json(user);
        }
    },
    async details(req) {
        const { _id } = req;
        console.log("details: "+_id)
        const user = await User.findOne({ _id });
        if (user == null) {
            return false;
        } else {
            return { user };
        }
    },

    async listarServicos(res) {
        const user = await User.find({toggleButton: "true"});
        if (user == null) {
            return {msg: "404"};
        } else {
            return res.json({user});
        }
    },

    async searchUserId(req, res) {
        const { _id } = req.params;
        const user = await User.findOne({ _id });
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json(user);
        }
    },
    async autenticacao(req) {
        const { userEmail, userPassword } = req;
        const user = await User.findOne({ userEmail });
        if (user == null) {
            return false;

        } else {
            const checkPass = await bcrypt.compare(userPassword, user.userPassword);
            if (checkPass) {
                let token = null;
                try {
                    token = jwt.sign({
                        _id: user._id,
                    },
                        process.env.SECRET,
                    );

                    console.log("Autenticação realizada com sucesso");
                } catch (error) {
                    console.log(`Ocorreu um erro ${error}`);
                }
                return { user, token };
            } else {
                return false;
            }

        }
    },
    async delete(req, res) {
        const { id } = req;
        const user = await User.findByIdAndDelete({ _id: id });
        if (user == null) {
            return res.status(404).json({ erro: "Erro" });
        } else {
            return res.status(202).json(user);
        }
    },
    async update(req, res) {
        const { _id, userPassword } = req.body;
        const user = await User.findOneAndUpdate({ _id: _id }, { userPassword: userPassword }, { new: true });
        if (user == null) {
            return { erro: "Erro" };
        } else {
            return res.status(202).json(user);
        }
    },
    async updateData(req, res) {
        const { _id, userFirstName, userLastName, userEmail, userCPF, userDTNasc, userPhone, toggleButton, userServico,userServDescricao, userServModalidade, userCity, userState } = req.body;
        const data = { userFirstName, userLastName, userEmail, userCPF, userDTNasc, userPhone, toggleButton, userServico,userServDescricao, userServModalidade, userCity, userState };
        const user = await User.findOneAndUpdate({ _id }, data, { new: true });
        if (user == null) {
            return res.json({ erro: "Erro" });
        } else {
            return res.json(user);
        }
    }
}