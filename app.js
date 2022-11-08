const bodyparser = require('body-parser');
const express = require('express');
const app = express();
const login = require('./models/login');
const feedback = require('./models/feedback');
const criacao_crm = require('./models/criacao_crm');
const anexos = require('./models/anexos');
const db = require('./models/db');
const colaborador = require('./models/colaborador');
// const SetoresEnvolvidos = require('./models/setor_envolvidos');
// const setor = require('./models/setor');
// const setores_envolvidos = require('./models/setor_envolvidos');
const session = require("express-session");
const flash = require("connect-flash");
const { Model, DatabaseError } = require('sequelize');
const crm = require('./models/crm');
const fileUpload = require('express-fileupload');




//Criando o EJS
app.set('view engine', 'ejs');
// app.use(express.static('public'));

//Configurando sessão
// app.use(session({
//     secret: "Testando",
//     resave: true,
//     saveUninitialized: true

// }))
// app.use(flash())

//Upload de arquivos
app.use(fileUpload())

//função utilizada para comparar os dados
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//Solicitando as imagens e CSS
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/assets"));


//deixando as rotas "conhecidas"
app.get("/", function (req, res) {
    res.render("../views/index")
});

app.route('/crm')
    .get(async function (req, res) {
        try {
            let retorno = await db.query("SELECT * FROM projetocrm.crm where idcrm = 1")
            // res.render('crm', {retorno: retorno[0][0].descricao});

            res.render('crm', {
                descricao: retorno[0][0].descricao,
                comportamento_off: retorno[0][0].comportamento_off,
                demanda: retorno[0][0].demanda,
                alternativa: retorno[0][0].alternativa,
                impacto: retorno[0][0].impacto
            })
            console.log('===============================================')
            console.log(JSON.stringify(retorno))
            console.log('===============================================')

        }
        catch (error) {
            console.log("erro:", error)
        }
    });

app.get("/error", async (req, res) => {
    res.sendFile(__dirname + "/views/index_error.html")
});

app.route('/inicial')
    .post(async function (req, res) {
        try {
            let retorno = await db.query("SELECT nome FROM colaborador WHERE idColaborador = 980144")
            res.render('inicial', { nome: retorno[0][0].nome });
            console.log(nome)
        }
        catch (error) {
            console.log("erro:", error)
        }
    });

app.get("/criacao", async (req, res) => {
    res.render("../views/criacao_crm")
});

app.get("/crm_criada", async (req, res) => {
    res.render("../views/crm_criada")
});

app.get("/minha_crm", async (req, res) => {
    res.sendFile(__dirname + "/views/minha_crm.html")
});

app.get("/pesquisar", async (req, res) => {
    res.sendFile(__dirname + "/views/pesquisar.html")
});

//valiando o usuário
app.post("/inicial" || "/error", async (req, res) => {
    try {
        let usuario = await login.findOne({
            attributes: ["idColaborador", "senha"],
            where: {
                idColaborador: req.body.id,
                senha: req.body.senha
            }
        });
        if (usuario === [] || usuario === null) {
            throw "ID ou senha incorreta!"
        }
        else {
            res.render("./inicial")
        }

    }
    catch (error) {
        res.sendFile(__dirname + "/views/index_error.html")
    }
});

app.post('/teste', function (req, res) {
    console.log(req.body)
})

app.post('/criacao', async function (req, res) {
    const teste = await db.transaction();
    try {
        let retorno = await criacao_crm.max('idcrm');
        if (retorno === null) {
            retorno = 0;
        }
        else {
            retorno = parseInt(retorno);
        }
        await criacao_crm.create({
            idcrm: retorno + 1,
            versao: 1,
            colaborador_idColaborador: 980144,
            descricao: req.body.descricao,
            comportamento_off: req.body.offline,
            demanda: req.body.objetivo,
            alternativa: req.body.alternativa,
            impacto: req.body.impacto,
            setores_envolvidos: JSON.stringify(req.body.setores)
        },
            {
                fields: ['idcrm', 'versao', 'colaborador_idColaborador', 'descricao', 'comportamento_off', 'demanda', 'alternativa', 'impacto', 'setores_envolvidos'],
            }, { transaction: teste });
            console.log(req.body)
        let setorRetorno = await colaborador.findOne({
            attributes: ['idcolaborador', 'setor'],
            where: {
                idcolaborador: 980144
            }
        })
        // await req.body.setores.forEach(setor => {
        //     SetoresEnvolvidos.create({
        //         crm_idcrm: retorno + 1,
        //         crm_versao: 1,
        //         idSetor: parseInt(setor)
        //     },
        //         {
        //             fields: ['crm_idcrm', 'crm_versao', 'idSetor']
        //         }, { transaction: teste });
        // })
        // if (req.files){
        //     console.log(req.files)
        // }
        // const enviando = await anexos.create({
        //     anexos: req.files.uploadFile,
        // })
        // console.log(uploadedFile);
        
        const date = new Date();

        await anexos.create({
            anexos: req.body.uploadFile,
            name: 'Nome Do Arquivo',
            date: date.toString()
        })
        console.log('---------------------------',req.files, req.body)
        // if (req.files){
            
        // }
        // let file = await db.query("SELECT nome FROM colaborador WHERE idColaborador = 980144")

        


        await teste.commit();
        res.render("../views/crm_criada");
    }
    catch (error) {
        console.log("ERRORRRR", error)

        await teste.rollback();
        res.send('Erro ao criar CRM: ' + error.message);
    }
});

app.get('/crm', (req, res) => {
    crm.findAll().then((data) => {
        res.send(data)
    })
    console.log('aqui')
    console.log(req, res)
});



//conectando ao servidor

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000: http://localhost:3000");
});

module.exports = app;