# Documentação de Arquitetura — API de Notificações

## 1. Visão Geral

A API de Notificações é um módulo back-end REST responsável por gerenciar o envio
de notificações por e-mail para participantes de eventos em uma plataforma de eventos.

## 2. Arquitetura em Camadas

Cliente (Postman/Browser)
│
▼
[Middlewares] → express.json, cors, responseTime, cacheMiddleware
│
▼
[Routes] → Mapeamento de URLs para Controllers
│
▼
[Controllers] → Recebe req, chama Service, monta res
│
▼
[Services] → Validação, regras de negócio
│
▼
[Models (Sequelize)] → Acesso ao banco de dados
│
▼
[MySQL] → Persistência

## 3. Entidades e Relacionamentos

| Entidade     | Tabela        | Descrição                          |
| ------------ | ------------- | ---------------------------------- |
| Evento       | eventos       | Representa um evento na plataforma |
| Participante | participantes | Pessoa cadastrada                  |
| Inscrição    | inscricoes    | Relação participante ↔ evento      |
| Notificação  | notificacoes  | E-mail enviado ou a enviar         |

### Relacionamentos:

- Evento 1 → N Inscrição
- Participante 1 → N Inscrição
- Inscrição 1 → N Notificação

## 4. Endpoints da API

### Eventos

| Método | Rota                | Descrição         |
| ------ | ------------------- | ----------------- |
| GET    | /eventos            | Listar (paginado) |
| GET    | /eventos/:id        | Buscar por ID     |
| POST   | /eventos            | Criar             |
| PUT    | /eventos/:id        | Atualizar         |
| DELETE | /eventos/:id        | Deletar           |
| POST   | /eventos/:id/banner | Upload de imagem  |

### Participantes

| Método | Rota                | Descrição         |
| ------ | ------------------- | ----------------- |
| GET    | /participantes            | Listar (paginado) |
| GET    | /participantes/:id        | Buscar por ID     |
| POST   | /participantes            | Criar participante             |
| PUT    | /participantes/:id        | Atualizar participante         |
| DELETE | /participantes/:id        | Deletar participante           |

### Inscrições

| Método | Rota                | Descrição               |
| ------ | ------------------- | -----------------       |
| GET    | /inscricoes         | Listar (paginado)       |
| GET    | /inscricoes/evento/:id | Buscar por ID do evento |
| GET   | /inscricoes/:id/detalhes            | Buscar detalhes através do ID da inscrição                   |
| POST    | /inscricoes        | Criar inscrição               |
| PATCH | /inscricoes/:id/cancelar        | Cancelar inscrição                 

## 5. Tecnologias e Justificativa

| Tecnologia | Justificativa                                          |
| ---------- | ------------------------------------------------------ |
| Node.js    | Runtime JavaScript no servidor, conhecimento da equipe |
| Express.js | Framework minimalista e flexível                       |
| MySQL      | Banco relacional, sinergia com UC de BD                |
| Sequelize  | ORM que abstrai SQL, facilita migrations               |

## 6. Estrutura de Pastas

A estrutura do projeto é organizada em camadas, separando documentação, código-fonte, configuração e arquivos de apoio.

```text
notificacoes-api/
├── docs/
│   ├── diagramas/
│   │   ├── Diagrama.drawio
│   │   └── Diagrama.drawio.png
│   ├── prints-requisicoes/ 
│   ├── projetos-insomnia/ 
│   ├── sprint-reviews/ 
│   ├── arquitetura.md
│   ├── auditoria-qualidade.md
│   ├── custos.md
│   ├── definition-of-done.md
│   ├── infraestrutura.md
│   ├── pesquisa-mercado.md
│   ├── project-charter.md
│   ├── riscos.md
│   ├── standup-log.md
│   ├── status-report.md
│   └── wbs.md 
├── src/
│   ├── config/
│   │   ├── cache.js
│   │   ├── database.example.json
│   │   ├── database.js
│   │   └── upload.js
│   ├── controllers/
│   │   ├── EventoController.js
│   │   ├── InscricaoController.js
│   │   └── ParticipanteController.js
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── errors/
│   │   └── AppError.js
│   ├── helpers/
│   │   ├── parseId.js
│   │   └── validators.js
│   ├── middlewares/
│   │   ├── cacheMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── notFound.js
│   │   └── responseTime.js
│   ├── models/
│   │   ├── EventoModel.js
│   │   ├── InscricaoModel.js
│   │   ├── NotificacaoModel.js
│   │   ├── ParticipanteModel.js
│   │   └── index.js
│   ├── routes/
│   │   ├── eventoRoutes.js
│   │   ├── inscricaoRoutes.js
│   │   ├── exportRoutes.js
│   │   └── participanteRoutes.js
│   ├── services/
│   │   ├── EventoService.js
│   │   ├── InscricaoService.js
│   │   └── ParticipanteService.js
│   ├── app.js
│   ├── server.js
│   └── swagger.js
├── uploads/  
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

## 7. Variáveis de Ambiente

| Variável | Descrição         
| -------- | ----------------- 
| PORT     | 3000              
| DB_HOST  | localhost         
| DB_NAME  | notificacoes_db   


> **Capacidade técnica exercitada:** 9 
* Modelagem UML: Utilizada como ferramenta crítica para revisões de banco de dados.

* Teste de Qualidade: Criação e implementação do DoD (Definition of Done), estabelecendo critérios claros que aumentaram a confiabilidade das documentações.

* Padronização de APIs: Implementação de fluxos de teste e documentação via Swagger e Insomnia, assegurando contratos de interface precisos.

