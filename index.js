import express from 'express'
import { gerarChunk } from './generate_chunk.js';
import cors from 'cors';
import { esta_minerando, segundosParaFinalizar } from './utils.js';

let players = [];
let player =
{
    chunk: gerarChunk(),
    id_bloco_selecionado: null,
    data_inicio: null,
    data_objetivo: null
};

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/checar_status', (req, res) => {
    if (player.data_inicio, player.data_objetivo) {
        const segundos_restantes = segundosParaFinalizar(player.data_objetivo);
        if (new Date() >= player.data_objetivo) {
            //player.data_inicio = null;
            //player.data_objetivo = null;
            player.chunk[player.id_bloco_selecionado - 1].enabled = false;
            res.json({ status: 'recompensa', nome: "barra de ouro", quantidade: 2, preco: 10 });
        } else {
            res.json(
                {
                    status: 'minerando',
                    data_inicio: player.data_inicio,
                    data_objetivo: player.data_objetivo,
                    bloco: player.chunk[player.id_bloco_selecionado -1]
                });
        }
    } else {
        res.json({ status: "inativo" });
    }
});

app.get('/reivindicar', (req, res) => {
    if (new Date() >= player.data_objetivo) {
        player.data_inicio = null;
        player.data_objetivo = null;
        res.json({message: 'Reividincado!'})
    } else {
        res.json({message: 'Nada a reinvidicar'});
    }
});

app.get('/gerar_chunk', (req, res) => {
    player.chunk = gerarChunk();
    res.json(player.chunk);
});

app.get('/get_chunk', (req, res) => {
    res.json(player.chunk);
})

app.get('/minerar/:posicao_id', (req, res) => {
    if (!esta_minerando(player)) { // Se não estiver minerando
        const posicao_id = req.params.posicao_id;
        const bloco = player.chunk[posicao_id - 1];

        if (bloco) {
            player.data_inicio = new Date();
            player.data_objetivo = new Date(new Date().getTime() + (bloco.segundos * 1000));
            player.id_bloco_selecionado = posicao_id;
            res.json(bloco);
        } else {
            res.send('Esse bloco não existe!');
        }
    } else {
        res.json({ status: 'minerando' })
    }
});

app.get('/chunk/:posicao_id', (req, res) => {
    const posicao_id = req.params.posicao_id;
    const bloco = player.chunk[posicao_id - 1];
    if (bloco) {
        res.json(bloco);
    } else {
        res.send('Esse bloco não existe!');
    }
});

app.listen(port, () => {
    console.log(`server running on port ${port}`)
});