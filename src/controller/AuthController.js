const User = require('../controller/UserController')
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
module.exports = {
    async authLogin(req, res) {
        const userEmail = req.body.userEmail;
        const userPassword = req.body.userPassword;
        console.log(req.body);
        const find = await User.autenticacao({ userEmail, userPassword });

        if (find) {
            return res.status(202).json({ ...find });
        }
        return res.status(203).json({ msg: "Acesso Negado" });
    },
    // async authSenha(req, res) {
    //     const email = req.body.email;
    //     const seg = req.body.seg;
    //     const findMentorado = await User.autenticacaoSenha({ email, seg });
    //     const findMentor = await Mentor.autenticacaoSenha({ email, seg });

    //     if (findMentorado) {
    //         return res.status(202).json({ ...findMentorado });
    //     }

    //     if (findMentor) {
    //         return res.status(202).json({ ...findMentor });
    //     }
    //     return res.status(203).json({ msg: "Acesso Negado" });
    // },
    async authSenhaLog(req, res) {
        const _id = req.id;
        const userPassword = req.body.userPassword;
        const currentPass = req.body.currentPass;
        const find = await User.autenticado({ _id, currentPass }, res);
        if (find.user) {
            const update = await User.update({ body: { userPassword, _id: _id } }, res)
            return update
        }
        return res.status(203).json({ msg: "Acesso Negado" });
    },
    async authCheck(req, res) {
        const _id = req._id;
        console.log(req)
        const find = await User.details({ _id }, res);
        if (find) {
            return res.status(202).json({ ...find });
        }
        return res.status(203).json({ msg: "Acesso Negado" });
    },

}