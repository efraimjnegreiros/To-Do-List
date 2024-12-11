const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Tarefa = require('./models/tarefa.modal');
const db = require('./config/database');

app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));

db.sync({force: true}).then( ()=>{
    console.log('Banco de Dados Sincronizado.');
})

app.get('/', async (req, res) => {
    try {
        let tarefas = await Tarefa.findAll();
        tarefas = tarefas.map(tarefa => tarefa.dataValues);
        res.render('listarTarefas', { tarefas });
    } catch (e) {
        console.log(e);
        res.status(500).send('Erro ao carregar as tarefas');
    }
})

app.get('/create', (req, res) => {
    res.render('criarTarefa');
})

app.post('/store', async (req, res) => {
    try {
        await Tarefa.create({ descricao: req.body. descricao });

        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.status(500).send('Erro ao adicionar tarefa');
    }
})

app.get('/edit/:id', async (req, res) => {
    try {
        let tarefa = await Tarefa.findByPk(req.params.id);
        tarefa = tarefa.dataValues;
        res.render('editarTarefa', { tarefa });
    } catch (e) {
        console.log(e);
        res.status(500).send('Erro ao carregar tarefa');
    }
})

app.post('/update/:id', async (req, res) => {
    try {
        const tarefa = await Tarefa.findByPk(req.params.id);
        tarefa.descricao = req.body.descricao;
        await tarefa.save();

        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.status(500).send("Erro ao Atuaizar Tarefa");
    }
})

app.post('/concluir/:id', async (req, res) => {
    try {
        const tarefa = await Tarefa.findByPk(req.params.id);
        tarefa.concluida = !tarefa.concluida;
        await tarefa.save();

        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.status(500).send("Erro ao Completar a Tarefa");
    }
})

app.post('/delete/:id', async (req, res) => {
    try {
        const tarefa = await Tarefa.findByPk(req.params.id);
        await tarefa.destroy();

        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.status(500).send("Erro ao Excluir a Tarefa");
    }
})

app.listen(3000, () => {
    console.log("Servidor Rodando na Porta 3000.")
})