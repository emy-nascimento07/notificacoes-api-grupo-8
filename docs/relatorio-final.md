# Relatório Técnico — API de Notificações
**Grupo:** 8.
**Membros:** Emilly Raissa Nascimento, Lívia Oliveira Martins Matos e Vinícius Oliveira Silva.
**Data:** 21/05/2026.

---

## 1. Introdução
### 1.1 Objetivo do Projeto
O objetivo do nosso projeto é desenvolver o sistema de notificações por e-mail de uma plataforma de gerenciamento de eventos online. Essa plataforma permite que organizadores criem eventos e que participantes realizem inscrições, enquanto o sistema desenvolvido será responsável por garantir a comunicação automática com os usuários. Nosso foco está no back-end, ou seja, na construção da lógica e dos processos que acontecem por trás da aplicação.

Na prática, o sistema deverá enviar e-mails de confirmação assim que um participante se inscrever em um evento, além de enviar lembretes próximos à data de realização. Além disso, também será necessário manter um histórico de todas as notificações enviadas, permitindo o controle e acompanhamento dessas mensagens. Dessa forma, nosso projeto busca garantir que os usuários estejam sempre informados sobre suas inscrições, contribuindo para uma melhor organização e experiência na plataforma.
### 1.2 Escopo
[O que está incluído e o que ficou de fora]

---

## 2. Tecnologias Utilizadas
| Tecnologia | Versão | Justificativa |
| ---------- | ------ | --------------------------- |
| Dotenv | 17.4.0 | Carrega variáveis de ambiente a partir do arquivo .env. |
| Express.js | 5.2.1 | Facilita a criação de aplicações web no backend usando JavaScript. |
| Node.js | v18+ | Executa JavaScript fora do navegador, principalmente no backend (servidor). |
| Multer | 2.1.1 | Faz upload de arquivos no backend, geralmente em aplicações com Express.js. |
| MySQL | 3.22.8 | Usado para armazenar, organizar e gerenciar dados de forma estruturada. |
| Node cache | 5.1.2 | É a "memória de acesso rápido" da aplicação. Ele guarda temporariamente os dados mais pedidos na RAM para não sobrecarregar o Banco de Dados, fazendo a API responder muito mais rápido. |
| Nodemailer | 8.0.7 | O motor de disparos. Serve exclusivamente para a aplicação enviar e-mails automatizados (como recuperação de senha, alertas ou relatórios). |
| Sequelize | 6.37.8 | É o tradutor do Banco de Dados (ORM). Em vez de escrever código SQL puro, gerencia as tabelas e faz consultas usando JavaScript. Facilita a manutenção e protege contra ataques (SQL Injection). |
| Swagger | 6.2.8 | O manual de instruções da API. Gera uma página web interativa onde a equipe (especialmente o Front-end) consegue ver quais rotas existem e testá-las direto pelo navegador. |
| Xml builder | 4.0.3 | O tradutor de arquivos. Transforma dados do JavaScript no formato XML, necessário para o sistema conversar com órgãos governamentais (como emissão de notas fiscais) ou sistemas bancários antigos. |

---

## 3. Arquitetura do Sistema
### 3.1 Diagrama de Classes
[Diagrama UML visual]: (docs/diagramas/Diagrama-uml.png)

[Diagrama UML em drawio]: (docs/diagramas/Diagrama-uml.drawio)


### 3.2 Arquitetura em Camadas
[Descreva brevemente: Routes → Controllers → Services → Models → MySQL]

### 3.3 Banco de Dados
#### Eventos
| Campo | Características | Função |
| ---------- | ------ | -----|
| ID | INT, PK, NOT NULL, AUTO_INCREMENT | Identificador único de cada evento |
| NOME | VARCHAR, NOT NULL | Título do evento |
| DESCRICAO | TEXT, NULLABLE | Descrição opcional do evento|
| DATA | DATETIME, NOT NULL | Data do evento |
| LOCAL | VARCHAR, NULLABLE | Local do evento |
| CAPACIDADE | INT, NULLABLE | Capacidade do evento |
| BANNER | VARCHAR, NULLABLE | Banner/Imagem relacionada ao evento |
| CREATED_AT | DATETIME, NOT NULL, DEFAULT_GENERATED | Identificação da data e horário que o evento foi criado no servidor |
| UPDATED_AT | DATETIME, NOT NULL, DEFAULT_GENERATED | Identificação da data e horário da última modificação registrada no servidor |

#### Participantes
| Campo | Características | Função |
| ---------- | ------ | -----|
| ID | INT, PK, NOT NULL, AUTO_INCREMENT | Identificador único de cada participante |
| NOME | VARCHAR, NOT NULL | Nome do participante |
| EMAIL | VARCHAR, UNIQUE, NOT NULL | E-mail do participante |
| CREATED_AT | DATETIME, NOT NULL, DEFAULT_GENERATED | Identificação da data e horário que o evento foi criado no servidor |
| UPDATED_AT | DATETIME, NOT NULL, DEFAULT_GENERATED | Identificação da data e horário da última modificação registrada no servidor |

#### Inscrições
| Campo | Características | Função |
| ---------- | ------ | -----|
| ID | INT, PK, NOT NULL, AUTO_INCREMENT | Identificador único de cada inscrição |
| EVENTO_ID | INT, FOREIGN KEY(Eventos), NOT NULL | ID do evento que a inscrição é relacionada |
| PARTICIPANTE_ID | INT, FOREIGN KEY(Participantes), NOT NULL | ID do participante proprietário da inscrição |
| DATA_INSCRICAO | DATETIME, NOT NULL, DEFAULT_GENERATED | Data que a inscrição foi registrada (automática) |
| STATUS | ENUM('confirmada', 'cancelada'), NOT NULL | Status da inscrição |
| CREATED_AT | DATETIME, NOT NULL, DEFAULT_GENERATED | Identificação da data e horário que o evento foi criado no servidor |
| UPDATED_AT | DATETIME, NOT NULL, DEFAULT_GENERATED | Identificação da data e horário da última modificação registrada no servidor |

#### Notificações
| Campo | Características | Função |
| ---------- | ------ | -----|
| ID | INT, PK, NOT NULL, AUTO_INCREMENT | Identificador único de cada notificação |
| INSCRICAO_ID | INT, FOREIGN KEY(Inscricoes), NOT NULL | ID da inscrição que a notificação é relacionada |
| TIPO | ENUM('confirmacao', 'lembrete', 'welcome'), NOT NULL | Tipo de notificação |
| DESTINATARIO_EMAIL | VARCHAR, NOT NULL | Destinatário do email (E-mail do participante) |
| ASSUNTO | VARCHAR, NOT NULL | Assunto do e-mail |
| CONTEUDO | TEXT, NOT NULL | Conteúdo(body) do e-mail |
| DATA_ENVIO | DATETIME, NULLABLE | Data em que o e-mail foi enviado |
| ENVIADA | TINYTINT, NULLABLE | Confirmação se o e-mail foi enviado |
| CREATED_AT | DATETIME, NOT NULL, DEFAULT_GENERATED | Identificação da data e horário que a notificação foi criada no servidor |
| UPDATED_AT | DATETIME, NOT NULL, DEFAULT_GENERATED | Identificação da data e horário da última modificação registrada no servidor |

#### Sequelizemeta
| Campo | Características | Função |
| ---------- | ------ | -----|
| NAME | VARCHAR, PK, NOT NULL | Migrations que irão guiar o servidor para criar as tabelas |


## 4. Funcionalidades Implementadas
| Funcionalidade | Status | Bloco PBE |
| --------------------------------- | ----------- | --------- |
| CRUD de Eventos | ✅ Completo | 1 e 3 |
| CRUD de Participantes | ✅ Completo | 1 e 3 |
| Inscrições | ✅ Completo | 1 e 3 |
| Middlewares e tratamento de erros | ✅ Completo | 2 |
| Validação de dados | ✅ Completo | 2 |
| Persistência MySQL | ✅ Completo | 3 |
| Exportação JSON/XML | ✅ Completo | 3 |
| Upload de arquivos | ✅ Completo | 3 |
| Notificações por e-mail | ✅ Completo | 4 |
| Deploy | 🟡 Em Andamento | 5 |
| Documentação Swagger | ✅ Completo | 5 |

---

## 5. Processo de Desenvolvimento
### 5.1 Metodologia
#### 📋 Quadro Kanban - Notificações API (Grupo 8)

Histórico de acompanhamento do desenvolvimento do projeto.

---

#### 📊 Visão Geral (Board)

| 🔴 Não Concluídos | 🟡 Em Revisão | 🟢 Concluídos |
| :--- | :--- | :--- |
| 🚀 Deploy <br><br> 💻 Desenv. - Histórico de Notificações <br><br> 🎤 Apresentação do Projeto Final | *(Nenhuma tarefa em revisão)* | ✔️ CRUD - Eventos <br> ✔️ CRUD - Participantes <br> ✔️ Banco de Dados & Configurações <br> ✔️ Documentações (Swagger/UML) <br> ✔️ Serviços de Email |

---

#### 📝 Detalhamento das Tarefas

##### 🔴 Não Concluídos
- [ ] **Deploy**
- [ ] **Desenvolvimento:** Histórico de Notificações
- [ ] **Apresentação do Projeto Final**

##### 🟡 Em Revisão
*Nenhum item pendente de revisão no momento.*

##### 🟢 Concluídos
- [x] CRUD - Eventos
- [x] CRUD - Participantes
- [x] Levantamento de Requisitos
- [x] Cache
- [x] Upload de Arquivos
- [x] Documentação Swagger
- [x] Diagrama UML
- [x] Desenvolvimento - Migrations e Seeds
- [x] Criação do Banco de Dados
- [x] Integração com Banco de Dados
- [x] Padrão MVC + Estrutura de Pastas
- [x] Tratamento de Erros
- [x] Tecnologias
- [x] Clean Code
- [x] Configuração de Ambiente
- [x] Configuração do MySQL
- [x] Inscrições + Middlewares + Services
- [x] Validações - Base
- [x] Criação do Board/KanBan
- [x] Exportação JSON/XML
- [x] DoD (Definition of Done)
- [x] Documentação Técnica
- [x] Documentação do Projeto
- [x] Finalização do README
- [x] Models Sequelize
- [x] Migração do CRUD para o Banco
- [x] Testes Finais
- [x] Configuração do Nodemailer
- [x] Desenvolvimento - Templates de Email
- [x] Desenvolvimento - Envio de Confirmação

### 5.2 Divisão de Trabalho
| Atividade | Emilly | Lívia |Vinícius |
|---|---|---|---|
| Models/Migrations | R | R | R |
| Controllers/Routes | R | R | R |
| Services | R | R | R |
| Documentação | C | R | C |
| Testes Insomnia | R | A | I |
| Deploy | C | C | R |
*R* = Responsável | *A* = Aprovador | *C* = Consultado | *I* = Informado

### 5.3 Controle de Versão
[Quantos commits, como organizaram branches]

---

## 6. Desafios e Soluções
| Desafio | Como resolvemos |
| ------------------------------- | ------------------------------------------- |
| [ex: conflitos de merge] | [ex: combinamos de sempre fazer pull antes] |
| [ex: Sequelize logging confuso] | [ex: desativamos em produção] |

---

## 7. Lições Aprendidas
[O que cada membro aprendeu de mais importante durante o projeto]

---

## 8. Próximos Passos (se o projeto continuasse)
[O que fariam se tivessem mais tempo — autenticação, front-end, notificações push, etc.]

---

## 9. Referências
- [Documentação do Express.js](https://expressjs.com/)
- [Documentação do Sequelize](https://sequelize.org/)
- [Documentação do Nodemailer](https://nodemailer.com/)