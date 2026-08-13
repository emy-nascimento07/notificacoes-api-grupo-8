## 1.Inventário da arquitetura

| Camada     | Arquivos encontrados        | Responsabilidade                           |
| ------------ | ------------- | ---------------------------------- |
| Rotas       | eventoRoutes.js, exportRoutes.js, inscricaoRoutes.js, notificacaoRoutes.js, participanteRoutes.js  | Representam o caminho e os métodos HTTPS de cada rota. |
| Controllers | EventoController.js, InscricaoController.js, ParticipaController.js | Coordenam as requisições e validam dados iniciais (lidam apenas com HTTPS).                  |
| Services    | EmailService.js, EventoService.js, InscricaoService.js, NotificacaoS rvice.js, ParticipanteService.js   | Valida, aplica regras de negócio, chama o model.     |
| Models  | EventoModel.js, index.js, InscricaoModel.js, NotificacaoModel.js, ParticipanteModel.js  | Lida com os dados do CRUD        |
| Middlewares  | cacheMiddleware.js, errorHandler.js, logger.js, notFound.js, responseTime.js  | Tratamento de erros centralizados e personalizados.         |
| Configuração / .env  | cache.js, database.example.json, database.js, upload.js  | Configurações essenciais do projeto, como senha, banco e tempo de resposta.      |
| Helpers  | parseId.js, validators.js  | Função de validação para que requisições também sejam recusadas.         |
| Errors  | AppErrors.js  | Define e exporta uma hierarquia de erros personalizados.         |
| Events  | eventEmitter.js, logObserver, notificacaoObserver.js  | O Emitter implementa o Observer que cria relação de "escuta".        |
| Logs  |  - | Anota cada movimento que acontece, do sistema para o banco.         |
| Templates  | baseTemplate.js, cancelamentoInscricao.js, confirmacaoInscricao.js, criacaoInscricao.js, lembreteEvento.js  | E-mails pré-prontos para envio de cada funcionalidade.         |
| Database  |  migrations e seeders | Controla a versão e popula o banco de dados.       |

## 2.Mapa das rotas
### Eventos

| #  | Método | Caminho | Exige token? | Controller | Service | Model(s) | Efeito colateral |
| ------------ | ------------- | ------ | ------ | ------- | ----- | ------ | ------- |
| 1 | GET | /eventos | Não | EventoController.index | EventoService.listarTodos | Evento.findAndCountAll | Nenhum |
| 2 | GET | /eventos/{id} | Não | EventoController.show | EventoService.buscarPorId | Evento.findByPk | Nenhum |
| 3 | POST | /eventos | Não | EventoController.store | EventoService.criar | Evento.create | Grava no banco |
| 4 | PUT | /eventos/{id} | Não | EventoController.update | EventoService.atualizar | Evento.findByPk | Grava no banco |
| 5 | DELETE | /eventos/{id} | Não | EventoController.destroy | EventoService.deletar | Evento.findByPk | Deleta do banco |
| 6 | POST | /{id}/banner | Não | - | - | Evento.findByPk | Grava no banco |
| 7 | GET | /eventos/futuros | Não | EventoController.futuros | EventoService.listarFuturos | Evento.findAll | Nenhum |

### Participantes

| #  | Método | Caminho | Exige token? | Controller | Service | Model(s) | Efeito colateral |
| ------------ | ------------- | ------ | ------ | ------- | ----- | ------ | ------- |
| 1 | GET | /participantes | Não | ParticipanteController.index | ParticipanteService.listarTodos | Participante.findAll | Nenhum |
| 2 | GET | /participantes/{id} | Não | ParticipanteController.show | ParticipanteService.buscarPorId | Participante.findByPk | Nenhum |
| 3 | POST | /participantes | Não | ParticipanteController.store | ParticipanteService.criar | Participante.create | Grava no banco |
| 4 | PUT | /participantes/{id} | Não | ParticipanteController.update | ParticipanteService.atualizar | Participante.findByPk | Grava no banco |
| 5 | DELETE | /participantes/{id} | Não | ParticipanteController.destroy | ParticipanteService.deletar | Participante.findByPk | Grava no banco |

### Inscrições

| #  | Método | Caminho | Exige token? | Controller | Service | Model(s) | Efeito colateral |
| ------------ | ------------- | ------ | ------ | ------- | ----- | ------ | ------- |
| 1 | GET | /inscricoes | Não | InscricaoController.index | InscricaoService.listarTodas | Inscricao.findAll | Nenhum |
| 2 | POST | /inscricoes | Não | InscricaoController.store | InscricaoService.store | Inscricao.create | Grava no banco |
| 3 | GET | /inscricoes/evento/{id} | Não | InscricaoController.listarPorEvento | InscricaoService.listarPorEvento | Inscricao.findByPk | Nenhum |
| 4 | PATCH | /inscricoes/{id}/cancelar | Não | InscricaoController.cancelar | InscricaoService.cancelar | Inscricao.findByPk | Grava no banco |
| 5 | GET | /inscricoes/{id}/detalhes | Não | InscricaoController.detalhes | InscricaoService.buscarComDetalhes | Inscricao.findByPk | Nenhum |

### Notificações

| #  | Método | Caminho | Exige token? | Controller | Service | Model(s) | Efeito colateral |
| ------------ | ------------- | ------ | ------ | ------- | ----- | ------ | ------- |
| 1 | GET | /notificacoes | Não | - | NotificacaoService.listarTodas | Notificacao.findAll | Nenhum |
| 2 | GET | /notificacoes/estatisticas | Não | - | NotificacaoService.obterEstatisticas | Notificacao.count / Notificacao.findAll | Nenhum |
| 3 | GET | /notificacoes/{id} | Não | - | NotificacaoService.buscarPorId | Notificacao.findByPk | Nenhum |
| 4 | POST | /notificacoes/{id}/reenviar | Não | - | NotificacaoService.reenviar | Notificacao.buscarPorId | Envia e-mail |
| 5 | POST | /notificacoes/teste-email | Não | - | EmailService.enviar | transporter.sendMail | Envia e-mail teste |

### Export

| #  | Método | Caminho | Exige token? | Controller | Service | Model(s) | Efeito colateral |
| ------------ | ------------- | ------ | ------ | ------- | ----- | ------ | ------- |
| 1 | GET | /exportar/eventos/xml | Não | - | - | Evento.findAll | Nenhum |
| 2 | GET | /exportar/inscricoes/xml | Não | - | - | Inscricao.findAll | Nenhum |
| 3 | GET | /exportar/eventos/json | Não | - | - | Evento.findAll | Nenhum |
| 4 | GET | /exportar/relatorio/inscricoes | Não | - | - | Evento.findAll | Nenhum |
| 5 | GET | /exportar/relatorio/inscricoes/csv | Não | - | - | Inscricao.findAll | Nenhum |



## 3.Que nível de teste cabe onde?
| # | Comportamento a verificar | Nível | Porque este nível |
| :--- | :---: | :---: | ---: |
|1| <b> Autenticação</b>: envio de credencias inválidas      | endpoint| A verificação avalia a resposta pela porta da frente da API (código de status HTTP e contrato da rota). 
|2| <b> Notificações</b>: O método de criar notificação grava corretamente o registro na tabela de notificações do banco. | integração                | É necessário verificar se a comunicação entre o Service e o banco de dados (Model) funciona na prática. |
|3| <b>Eventos</b>: Função que valida se a data do evento é posterior à data atual lança erro ao receber data passada.    | unitário                | É uma regra de negócio pura que roda isolada na memória, sem depender de banco de dados ou requisição HTTP. |
|4| <b> Participantes</b>: O método de criar notificação grava corretamente o registro na tabela de notificações do banco. | endpoint                | A validação testa a execução do middleware de autenticação da rota HTTP. |
|5| <b> Notificações</b>: O método de criar notificação grava corretamente o registro na tabela de notificações do banco. | integração                |Testa a interação entre a regra do módulo e um serviço externo (servidor de e-mail MailPit/Nodemailer). |


## 4.Análise
#### 4.1 Se uma única funcionalidade do módulo falhasse silenciosamente em produção — sem mensagem de erro, sem log —, qual delas causaria o maior estrago? Por quê?
 A funcionalidade que causaria o maior estrago se falhasse silenciosamente é o envio das notificações por e-mails. Se essa rotina falhar sem gerar logs ou mensagens de erro, a API vai respnder que tudo deu certo, mas os usuários simplesmente não receberão os avisos.


#### 4.2 Quais pontos do módulo dependem de algo externo ao código de vocês (banco, servidor de e-mail, relógio do sistema, variáveis de ambiente)? Listem todos.
O módulo depende de:
- <b>Banco de dados</b>: Para gravar e ler dados de usuários, eventos e inscrições 
- <b>(MailPit / Nodemailer)</b>: Para enviar os e-mails
- <b>Variáveis de ambiente (.env)</b>: Onde ficam senhas, portas e a chave secreta SWT.
- <b>Relógio do sistema</b>: Para validar se datas de eventos ou tokens estão no futuro ou no passado.

#### 4.3 Escolham uma função ou método que seja regra de negócio pura — algo que roda sem precisar de banco nem de rede. Copiem o nome e o arquivo. 
Escolhemos a função validarEmail() do arquivo src/utils/validators.js (ou a função de validar se a data do evento é futura em services/evento.service.js). Ela apenas recebe uma informação e valida se está correta, rodando 100% isolada.

#### 4.4 Existe alguma parte do módulo que vocês não sabem explicar o que faz? Registrem qual. Não é demérito — é a primeira coisa que um responsável por qualidade precisa mapear ao assumir um sistema.
Não, nosso grupo sabe explicar todas partes do módulo estudado!


## 5. Desafio Extra
#### Qual rota vocês classificariam como a de maior risco e qual como a de menor risco?
A rota de maior risco é a de POST /Inscrições, pois ela exige validações prévias, envolvendo muitas tabelas. Se falhar afeta a tabela de eventos e de particpantes, criando uma linha vazia.

Qualquer rota com o método GET é de menor risco, porque não necessitam de validações e retornam apenas o pedido (inscrições, notificações, participantes ou eventos).