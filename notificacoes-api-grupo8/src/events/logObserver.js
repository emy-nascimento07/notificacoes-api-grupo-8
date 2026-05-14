const fs = require("fs"); 
const path = require("path");
const appEmitter = require("./eventEmitter");

// Caminho direto para a pasta src/logs
const logsDir = path.join(__dirname, '../logs');
const logFilePath = path.join(logsDir, 'app.log');

function registrarLog(mensagem) {
    try {
        // Garante a criação da pasta no momento da escrita, caso ela não exista
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true }); 
        }
        
        const linha = `[${new Date().toISOString()}] ${mensagem}\n`;
        
        // Escreve de forma síncrona forçando a gravação física no disco
        fs.appendFileSync(logFilePath, linha, 'utf8');
        console.log(`[LOG-SISTEMA] Gravado com sucesso em: ${logFilePath}`);
    } catch (erro) {
        console.error("[LOG-SISTEMA] Erro crítico ao gravar arquivo:", erro.message);
    }
}

// Membro 1 : Escutar criação de inscrições
appEmitter.on("inscricao:criada", (inscricao) => {
    registrarLog(`Inscrição #${inscricao.id} criada`);
});