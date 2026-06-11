# Project Charter — API de Notificações


## 1. Nome do Projeto
API de Notificações por E-mail para Plataforma de Eventos


## 2. Objetivo
Desenvolver uma API REST que gerencie o envio de notificações por e-mail
(confirmação de inscrição e lembretes) para participantes de eventos.


## 3. Justificativa
Este módulo é necessário para enviar notificações automáticas, sendo integrada ao front-end e back-end da plataforma. Assim, permitirá uma comunicação eficiente entre usuário e sistema.


## 4. Escopo
### Incluído:
- CRUD de Eventos, Participantes e Inscrições
- Módulo de notificações por e-mail (simulado)
- Documentação com Swagger
- Deploy em plataforma de nuvem


### Não incluído:
- Autenticação de usuários
- Front-end
- Envio de SMS ou push notifications


## 5. Equipe e Matriz de Responsabilidades (RACI)

| Atividade | Emilly | Lívia |Vinícius |
|---|---|---|---|
| Models/Migrations | R | R | R |
| Controllers/Routes | R | R | R |
| Services | R | R | R |
| Documentação | C | R | C |
| Testes Insomnia | R | A | I |
| Deploy | C | C | R |
**R** = Responsável | **A** = Aprovador | **C** = Consultado | **I** = Informado


## 6. Tecnologias
Node.js, Express.js, MySQL, Sequelize, Swagger, Nodemailer, Git/GitHub


## 7. Prazo
Início: [26/03/2026] | Entrega final: [data da apresentação]


## 8. Critérios de Sucesso
- [✅] API funcional com todos os CRUDs
- [ ] Dados persistidos em MySQL
- [ ] Notificações por e-mail funcionando (simulado)
- [✅] Documentação Swagger completa
- [ ] Deploy realizado
- [ ] Apresentação aprovada
