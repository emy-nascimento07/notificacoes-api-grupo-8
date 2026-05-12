# 🔔 Notificações API

> API REST para o módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos.

## 📋 Sobre o Projeto

Este projeto faz parte da Situação de Aprendizagem do curso de Programação Back-End do SENAI. O módulo é responsável por enviar notificações (como confirmação de inscrição e lembretes) para os participantes de eventos.

---

## 🚀 Como Rodar

**1. Clone o repositório:**

```bash
git clone [https://github.com/Emy-Nascimento07/notificacoes-api](https://github.com/Emy-Nascimento07/notificacoes-api)
```

**2. Instale as dependências:**

```bash
npm install
```

**3. Inicie o servidor:**

```bash
npm start
```

**4. Acesse no seu navegador:**

- **API:** http://localhost:3000
- **Documentação (Swagger):** http://localhost:3000/api-docs

---

## 🛣️ Rotas Disponíveis

### 📅 Eventos

| Método     | Rota           | Descrição               |
| :--------- | :------------- | :---------------------- |
| **GET**    | `/eventos`     | Listar todos os eventos |
| **GET**    | `/eventos/:id` | Buscar evento por ID    |
| **POST**   | `/eventos`     | Criar um novo evento    |
| **PUT**    | `/eventos/:id` | Atualizar um evento     |
| **DELETE** | `/eventos/:id` | Deletar um evento       |

### 👥 Participantes

| Método     | Rota                 | Descrição                     |
| :--------- | :------------------- | :---------------------------- |
| **GET**    | `/participantes`     | Listar todos os participantes |
| **GET**    | `/participantes/:id` | Buscar participante por ID    |
| **POST**   | `/participantes`     | Criar um novo participante    |
| **PUT**    | `/participantes/:id` | Atualizar um participante     |
| **DELETE** | `/participantes/:id` | Deletar um participante       |

### 🎟️ Inscrições

| Método    | Rota                           | Descrição                    |
| :-------- | :----------------------------- | :--------------------------- |
| **POST**  | `/inscricoes`                  | Criar uma nova inscrição     |
| **GET**   | `/inscricoes`                  | Listar todas as inscrições   |
| **GET**   | `/inscricoes/evento/:eventoId` | Listar inscrições por evento |
| **PATCH** | `/inscricoes/:id/cancelar`     | Cancelar uma inscrição       |

### 📤 Exportações

| Método    | Rota                           | Descrição                    |
| :-------- | :----------------------------- | :--------------------------- |
| **GET**  | `/exportar/eventos/xml`         | Exportar os eventos em formato xml   |
| **GET**   | `/exportar/eventos/json`       | Exportar os eventos em formato json   |
| **GET**   | `/exportar/relatorio/inscricoes` | Exportar relatório detalhado de inscrições por evento |

---

## ️ Tecnologias
- Node.js
- Express.js
- Swagger (swagger-jsdoc + swagger-ui-express)
- Dotenv (variáveis de ambiente)
- Nodemon (desenvolvimento)
- CORS

---

## 🔧 Scripts

| Comando | Descrição |

|---------|-----------|

| `npm start` | Inicia o servidor (produção) |

| `npm run dev` | Inicia com Nodemon (desenvolvimento) |

| `npm run db:migrate` | Executa migrations pendentes |

| `npm run db:migrate:undo` | Desfaz última migration |

| `npm run db:seed` | Insere dados iniciais |

| `npm run db:reset` | Recria banco completo |


## 🗄️ Banco de Dados

- **SGBD:** MySQL

- **ORM:** Sequelize

- **Tabelas:** eventos, participantes, inscricoes, notificacoes


## 📁 Estrutura do Projeto

notificacoes-api/ <br>
├── src/ <br>
│   ├── config/ <br>
│   │   ├── database.js          → Conexão Sequelize <br>
│   │   ├── database.example.json        → Config do CLI <br>
│   │   ├── upload.js            → Config do Multer <br>
│   │   └── cache.js             → Config do cache <br>
│   ├── database/ <br>
│   │   ├── migrations/          → 5 migrations <br>
│   │   └── seeders/             → Dados iniciais <br>
│   ├── errors/ <br>
│   │   └── AppError.js <br>
│   ├── helpers/ <br>|
│   │   ├── parseId.js <br>
│   │   └── validators.js <br>
│   ├── middlewares/ <br>
│   │   ├── cacheMiddleware.js <br>
│   │   ├── errorHandler.js <br>
│   │   ├── notFound.js <br>
│   │   ├── logger.js <br>
│   │   └── responseTime.js <br>
│   ├── models/ <br>
│   │   ├── index.js             → Relacionamentos<br>
│   │   ├── EventoModel.js       → Sequelize<br>
│   │   ├── ParticipanteModel.js → Sequelize<br>
│   │   ├── InscricaoModel.js    → Sequelize<br>
│   │   └── NotificacaoModel.js  → Sequelize<br>
│   ├── services/<br>
│   │   ├── EventoService.js     → Async + Sequelize<br>
│   │   ├── ParticipanteService.js<br>
│   │   └── InscricaoService.js<br>
│   ├── controllers/<br>
│   │   ├── EventoController.js <br>
│   │   ├── ParticipanteController.js<br>
│   │   └── InscricaoController.js<br>
│   ├── routes/<br>
│   │   ├── eventoRoutes.js<br>
│   │   ├── participanteRoutes.js<br>
│   │   ├── inscricaoRoutes.js<br>
│   │   └── exportRoutes.js      → XML, JSON, relatórios<br>
│   ├── swagger.js<br>
│   ├── app.js<br>
│   └── server.js<br>
├── uploads/                      → Arquivos enviados (não vai pro Git)<br>
├── docs/<br>
│   ├── diagrama-classes.png<br>
│   └── postman-collection.json<br>
├── .env <br>
├── .env.example <br>
├── .sequelizerc <br>
├── .gitignore <br>
├── package.json <br>
└── README.md
