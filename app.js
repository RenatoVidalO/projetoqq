const bodyparser = require('body-parser')
const express = require('express');
const app = express();
const login = require('./models/login');
const feedback = require('./models/feedback');
const criacao_crm = require('./models/criacao_crm');
const db = require('./models/db');

// findAll utiliza get/post

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

//conectando ao servidor
app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000: http://localhost:3000");
});