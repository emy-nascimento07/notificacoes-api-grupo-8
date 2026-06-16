# 🔔 Notificações API

> API REST para o módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos.

![Node.js](https://img.shields.io/badge/Node.js-24+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MariaDB](https://img.shields.io/badge/MariaDB-11.x-blue)
![Deploy](https://img.shields.io/badge/Deploy-Servidor%20SENAI-blueviolet)

**🌐 URL de Produção:** 10.137.146.208
**📚 Documentação:** http://localhost:3000/api-docs

--- 

## 📋 Sobre o Projeto

Sistema de notificações por e-mail para uma plataforma de eventos.
Quando um participante se inscreve em um evento, recebe automaticamente
um e-mail de confirmação. O sistema também envia notificações de cancelamento.

**Desenvolvido como projeto da SA2** — SENAI "Santo Paschoal Crepaldi"
Curso: Técnico em Desenvolvimento de Sistemas
UCs: Programação Back-End + Projetos de Software

### Equipe

- Emilly Raissa Nascimento — [GitHub] https://github.com/emy-nascimento07
- Lívia Oliveira Martins Matos — [GitHub] https://github.com/livia-matos315
- Vinícius de Oliveira Silva — [GitHub] https://github.com/viniciusbr-star


---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 24+
- MySQL 8.0 ou MariaDB 11+
- Git

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/emy-nascimento07/notificacoes-api-grupo-8.git
   cd notificacoes-api-grupo8
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o ambiente:

   ```bash
   cp .env.example .env
   # Edite o .env com suas credenciais do banco de dados
   ```

4. Crie o banco e execute as migrations:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

6. Acesse:
   - API: http://localhost:3000
   - Swagger: http://localhost:3000/api-docs

---

## 🛣️ Rotas Disponíveis

### 📅 Eventos

| Método     | Rota           | Descrição               |
| :--------- | :------------- | :---------------------- |
| **GET**    | `/eventos`     | Listar todos os eventos |
| **GET**    | `/eventos/:id` | Buscar evento por ID    |
| **GET**    | `/eventos/futuro` | Buscar eventos que ainda não aconteceram    |
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
| **GET** | `/inscricoes/:id/detalhes`     | Ver detalhes de uma inscrição |
| **PATCH** | `/inscricoes/:id/cancelar`     | Cancelar uma inscrição       |


### 📤 Exportações

| Método    | Rota                           | Descrição                    |
| :-------- | :----------------------------- | :--------------------------- |
| **GET**  | `/exportar/eventos/xml`         | Exportar os eventos em formato xml   |
| **GET**   | `/exportar/eventos/json`       | Exportar os eventos em formato json   |
| **GET**   | `/exportar/relatorio/inscricoes` | Exportar relatório detalhado de inscrições por evento |

### 🔔 Notificações 
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/notificacoes` | Listar (filtros: tipo, enviada) |
| GET | `/notificacoes/estatisticas` | Dashboard de envios |
| GET | `/notificacoes/:id `| Detalhes da notificação|
| POST |` /notificacoes/:id/reenviar` | Reenviar notificação |
| POST | `/notificacoes/teste-email` | Enviar e-mail de teste |

## 📧 Sistema de Notificações

A API envia e-mails automaticamente usando o **Padrão Observer**:

- **Confirmação de inscrição** — enviado ao criar uma inscrição

- **Cancelamento** — enviado ao cancelar uma inscrição

Em desenvolvimento, os e-mails são capturados pelo **MailPit** (servidor SMTP local).

Visualize os e-mails em `http://MAILPIT_IP:8025`.

---

## ️ Tecnologias
- Node.js
- Express.js
- MySQL
- Sequelize
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

- **Tabelas:** eventos, participantes, inscricoes, notificacoes, sequelizemeta


## 📁 Estrutura do Projeto

notificacoes-api/ <br>
├── docs/<br>
│   ├── diagramas/<br>
│   ├── print-requisições/<br>
│   ├── projetos-insomnia/<br>
│   ├── sprint-reviews<br>
│   ├── arquitetura.md<br>
│   ├── auditoria-qualidade.md<br>
│   ├── custos.md<br>
│   ├── definition-of-done.md<br>
│   ├── infraestrutura.md<br>
│   ├── pesquisa-mercado.md<br>
│   ├── postman-collection.json<br>
│   ├── postman-collection.yaml<br>
│   ├── project-charter.md<br>
│   ├── relatorio-final.md<br>
│   ├── riscos.md<br>
│   ├── standup-log.md<br>
│   ├── status-report.md<br>
│   ├── teste-integração.md<br>
│   └── wbs.md<br>
├── src/ <br>
│   ├── config/ <br>
│   │   ├── database.js          → Conexão Sequelize <br>
│   │   ├── database.example.json        → Config do CLI <br>
│   │   ├── upload.js            → Config do Multer <br>
│   │   ├── cache.js             → Config do cache <br>
│   │   └── config.json             
│   ├── database/ <br>
│   │   ├── migrations/          → 5 migrations <br>
│   │   └── seeders/             → Dados iniciais <br>
│   ├── errors/ <br>
│   │   └── AppError.js <br>
│   ├── events/ <br>
│   │   ├── eventEmitter.js <br>
│   │   ├── logObserver.js <br>
│   │   └── notificacaoObserver.js <br>
│   ├── helpers/ <br>|
│   │   ├── parseId.js <br>
│   │   └── validators.js <br>
│   ├── logs/ <br>
│   │   └── app.log <br>
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
│   ├── routes/<br>
│   │   ├── eventoRoutes.js<br>
│   │   ├── participanteRoutes.js<br>
│   │   ├── inscricaoRoutes.js<br>
│   │   ├── notificacaoRoutes.js<br>
│   │   └── exportRoutes.js      → XML, JSON, relatórios<br>
│   ├── services/<br>
│   │   ├── EventoService.js     → Async + Sequelize<br>
│   │   ├── ParticipanteService.js<br>
│   │   ├── InscricaoService.js<br>
│   │   ├── NotificacaoService.js<br>
│   │   └── EmailService.js<br>
│   ├── templates/<br>
│   │   ├── email/<br>
│   │   │   ├── baseTemplate.js<br>
│   │   │   ├── cancelamentoInscricao.js<br>
│   │   │   ├── ConfirmacaoInscricao.js<br>
│   │   │   ├── criacaoParticipantes.js<br>
│   │   │   └── lembreteEvento.js<br>
│   ├── controllers/<br>
│   │   ├── EventoController.js <br>
│   │   ├── ParticipanteController.js<br>
│   │   └── InscricaoController.js<br>
│   ├── app.js<br>
│   ├── server.js<br>
│   └── swagger.js<br>
├── uploads/                  → Banners <br>
├── .env <br>  
├── .env.example <br>
├── .gitignore          → Arquivos enviados (não vão para o Git)<br>
├── .sequelizerc <br>
├── deploy.sh <br>
├── package-lock.json <br>
├── package.json <br>
└── README.md
