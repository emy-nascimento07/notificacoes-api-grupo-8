const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const path = require('path');

// 🚨 ATIVAÇÃO DOS OBSERVERS AQUI DENTRO!
require('./events/notificacaoObserver');
require('./events/logObserver');

const app = express();

// Middlewares Globais
app.use(express.json());
app.use(cors());

// Rotas principais do projeto
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");
const exportRoutes = require('./routes/exportRoutes');
const notificacaoRoutes = require('./routes/notificacaoRoutes');

app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);
app.use('/exportar', exportRoutes);
app.use('/notificacoes', notificacaoRoutes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota informativa raiz
app.get("/", (req, res) => {
  res.json({ mensagem: "API de Notificações Ativa! 🚀" });
});

// Middlewares de erro (Sempre por último)
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
app.use(notFound);
app.use(errorHandler);

module.exports = app;