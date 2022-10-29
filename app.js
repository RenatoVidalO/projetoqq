const bodyparser = require('body-parser')
const express = require('express');
const app = express();
const login = require('./models/login');
const feedback = require('./models/feedback');
const criacao_crm = require('./models/criacao_crm');
const db = require('./models/db');


//função utilizada para comparar os dados
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//Solicitando as imagens e CSS
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/assets"));


//deixando as rotas "conhecidas"
app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
});

app.get("/error", async (req, res) => {
    res.sendFile(__dirname + "/views/index_error.html")
});

app.get("/home", async (req, res) => {
    res.sendFile(__dirname + "/views/inicial.html")
});

app.get("/criacao", async (req, res) => {
    res.sendFile(__dirname + "/views/criacao_crm.html")
});

app.get("/minha_crm", async (req, res) => {
    res.sendFile(__dirname + "/views/minha_crm.html")
});

app.get("/pesquisar", async (req, res) => {
    res.sendFile(__dirname + "/views/pesquisar.html")
});

//valiando o usuário
app.post("/home" || "/error", async (req, res) => {
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
            res.sendFile(__dirname + "/views/inicial.html")
        }
    }
    catch (error) {
        res.sendFile(__dirname + "/views/index_error.html")
    }
});


app.post('/createCRM', async function (req, res) {
    const c = await database.transaction();
    try{
        let retorno = await models.Crm.max('idcrm');
        if (retorno === null){
            retorno = 0;
        }
        else{
            retorno = parseInt(retorno);
        }
        console.log(retorno);
        await models.Crm.create({
            idcrm: retorno + 1,
            versao: 1,
            idcolaborador_criador: req.body.matricula,
            descricao: req.body.descricao,
            objetivo: req.body.objetivo,
            justificativa: req.body.justificativa,
            comportamentooffline: req.body.comportamentooffline
        },
        {
            fields: ['idcrm', 'versao', 'idcolaborador_criador', 'descricao', 'objetivo', 'justificativa', 'comportamentooffline']
        });
        let setorRetorno = await models.Colaborador.findOne({
            attributes: ['idcolaborador', 'setor'],
            where:{
                idcolaborador: req.body.matricula
            }
        })
        await models.SetoresEnvolvidos.create({
            crm_idcrm: retorno + 1,
            crm_versao: 1,
            setor_idsetor: setorRetorno.setor
        });
        await c.commit();
        res.send('CRM criado com sucesso!');
    }
    catch(error){
        await c.rollback();
        res.send('Erro ao criar CRM: ' + error.message);
    }
});

// app.post("/criacao", async(req, res) => {
//     await crm.create({
//       descricao: req.body.descricao,
//       comportamento_off: req.body.offline,
//       demanda: req.body.objetivo,
//       alternativa: req.body.alternativa,
//       impacto: req.body.impacto
//     })
//     .then(() => {
//       setores_envolvidos.create({
//         idSetor: req.body.checkbox
//       })
//     })
//     .then(() => {
//       res.redirect("/home")
//     }).catch((e) => {
//       res.send("Erro: CRM não foi registrada" + e)
//     })
//   })


//conectando ao servidor

app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000: http://localhost:3000");
});