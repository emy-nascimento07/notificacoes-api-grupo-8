const fs = require('fs');
const path = require('path');
const appEmitter = require('./eventEmitter'); 

const caminhoLog = path.join(__dirname, '..', 'logs', 'app.log');

// --- LOGS DE INSCRIÇÃO ---
appEmitter.on('inscricao:criada', (inscricao) => {
    const linha = `[${new Date().toISOString()}] Inscrição #${inscricao.id} criada\n`;
    try {
        fs.appendFileSync(caminhoLog, linha);
        console.log(`✅ [LOG] Sucesso! Inscrição #${inscricao.id} gravada no app.log`);
    } catch (err) {
        console.error("Erro ao gravar log de criação:", err);
    }
});

appEmitter.on('inscricao:cancelada', (inscricao) => {
    const linha = `[${new Date().toISOString()}] Inscrição #${inscricao.id} cancelada\n`;
    try {
        fs.appendFileSync(caminhoLog, linha);
    } catch (err) {
        console.error("Erro ao gravar log de inscrição cancelada:", err);
    }
});

// --- LOGS DE EVENTO ---
appEmitter.on('evento:criado', (evento) => {
    const linha = `[${new Date().toISOString()}] Evento #${evento.id} ("${evento.nome}") criado\n`;
    try {
        fs.appendFileSync(caminhoLog, linha);
    } catch (err) {
        console.error("Erro ao gravar log de evento criado:", err);
    }
});

appEmitter.on('evento:deletado', (evento) => {
    const linha = `[${new Date().toISOString()}] Evento #${evento.id} ("${evento.nome}") deletado\n`;
    try {
        fs.appendFileSync(caminhoLog, linha);
    } catch (err) {
        console.error("Erro ao gravar log de evento deletado:", err);
    }
});

// LOGS DE PARTICIPANTE
appEmitter.on('participante:criado', (participante) => {
    const linha = `[${new Date().toISOString()}] Participante #${participante.id} registrado\n`;
    try {
        fs.appendFileSync(caminhoLog, linha);
        console.log(`✅ [LOG] Sucesso! Participante #${participante.id} gravado no app.log`);
    } catch (err) {
        console.error("Erro ao gravar log de criação:", err);
    }
});

appEmitter.on('participante:deletado', (participante) => {
    const linha = `[${new Date().toISOString()}] Participante #${evento.id} ("${evento.nome}") deletado\n`;
    try {
        fs.appendFileSync(caminhoLog, linha);
    } catch (err) {
        console.error("Erro ao gravar log de evento deletado:", err);
    }
});