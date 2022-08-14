const express = require('express');
const router = express.Router();

const User = require('./controller/UserController');
const Auth = require('./controller/AuthController');
const checkToken = require('./middlewares/Jwt');


//rotas de autenticação
router.post('/auth/login', Auth.authLogin);
// router.post('/auth/senha', Auth.authSenha);
// router.post('/auth/senha-log', checkToken, Auth.authSenhaLog);
router.get('/auth/check', checkToken, async (req, res) => {
    const retorno = await Auth.authCheck({ _id: req.id }, res);
    return retorno;
});


//rotas de usuarios
router.get('/user', (req, res) => User.index(res));
router.get('/user/list', (req, res) => User.listarServicos(res));
router.post('/api/user', User.create);
router.get('/api/user', User.index);
router.put('/api/user', User.update); //Senha
router.delete('/api/user/', checkToken, async(req, res) =>{
    const retorno = await User.delete( req, res );
    return retorno;
})
router.put('/api/user-data', checkToken, async(req, res) =>{
    const retorno = await User.updateData( req, res );
    return retorno;
})  //Dados

//Rotas para o insomia
router.delete('/api/user-insomia/:_id', User.delete);
router.get('/api/user-search/:_id', User.searchUserId);

module.exports = router;