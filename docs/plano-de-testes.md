Sistema: Módulo de Notificações — Plataforma de Eventos
Versão: 1.0
Repositório: https://github.com/emy-nascimento07/notificacoes-api-grupo-8
Grupo / integrantes: Grupo 8 (Emilly, Lívia e Vinícius)
Data de elaboração: 20/08/2026
Última revisão: 20/08/2026

#### 2.1 - Para que serve este plano?
O plano serve para que as questões que colocam o projeto em mais risco de quebrar/falhar sejam resolvidas antes de outras, das quais não precisam de tanta atenção, Além disso, garante qualidade e segurança.

#### 2.2 - Dentro do escopo

| Funcionalidade / camada | Níveis previstos |
| ----- | ------ |
| **Autenticação (`/eve`)** | Endpoint e Integração |
| **Gestão de Eventos (`/eventos`)** | Unitário e Endpoint |
| **Inscrição de Participantes** | Endpoint e Integração |
| **Módulo de Notificações / E-mail** | Unitário e Integração |
| **Camada de Dados (Models / MySQL)** | Integração |

#### 2.3 - Fdo escopo

| O que não será testado | Motivo |
| ----- | ------ |
| **Paralelo** | Não existe versão do sistema antigo rodando simultaneamente |
| **Estresse** | Não existem requisitos que delimitam o tempo de resposta ou limite de carga |
| **Recuperação(Failover)** | Tempo restrrito: não existem oportunidades para testar queda e quebras no servidor |
 
### 3. Itens a testar

| # | Item a testar | Camada | Rota de origem |
| :--- | :--- | :--- | :--- |
| **1** | Criar um novo evento com dados válidos (`POST /eventos`) | Eventos (Controller/Service) | `src/controllers/EventoController.js` / `src/services/EventoService.js` |
| **2** | Tentar cadastrar evento com data passada ou dados ausentes | Evento (Service / Helpers) | `src/services/EventoService.js` `src/helpers/EventoServ.js` |
| **3** | Buscar detalhes de um evento por ID inexistente (`GET /eventos/:id`) | Evento (Service/Model)  | `src/services/EventoService.js``src/models/EventoModel.js` |
| **4** | Listar eventos com paginação, filtros e suporte a cache (`GET /eventos`) | Evento (Service) | `src/middlewares/cacheMiddleware.js` |
| **5** | Cadastrar um novo participante com e-mail válido (`POST /participantes`) | Evento (Controller) | `src/controller/EventoController.js` `src/helpers/validators.js` |
| **6** | Validação de formato de e-mail na função `isEmail()` do utilitário | Helpers (Validators) | `src/helpers/validators.js` |
| **7** | Criar uma nova inscrição relacionando evento e participante (`POST /inscricoes`) | Inscrições (Service/Model) | `src/services/InscricaoService.js` `src/models/InscricaoModel.js` |
| **8** | Tentar inscrever participante em evento inexistente ou com ID inválido | Inscrições (Controller/Service) | `src/services/InscricaoService.js` `src/controller/InscricaoController.js` |
| **9** | Cancelar uma inscrição existente alterando seu status (`PATCH /inscricoes/:id/cancelar`) | Inscrições (Service/Model) | `src/services/InscricaoService.js` `src/models/InscricaoModel.js` |
| **10** | Enviar e-mail de teste utilizando a integração de notificação (`POST /notificacoes/teste-email`) | Notificações / Email (Service) | `src/services/EmailService.js` |
| **11** | Reenviar notificação de confirmação mantendo os dados da mensagem (`POST /notificacoes/:id/reenviar`) | Notificações (Service) | `src/services/NotificacaoService.js` |
| **12** | Realizar upload de imagem de banner para um evento (`POST /eventos/:id/banner`) | Eventos (Upload) | `src/config/upload.js` |

### 4.0

| # | Item | P | I | Risco (PxI) | Grau | Decisão | Justificativa |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Criar um novo evento com dados válidos | 2 | 4 | M | Mitigar | Se falhar, deixa de criar um evento e impacta diretamente as inscrições |
| 2 | Cadastro de eventos com dados inválidos | 1 | 4 | B | Transferir | Implica diretamente pois os dados interferem na capacidade de criar novas inscrições |
| 3 | Buscar detalhes de um evento com ID inexistente | 2 | 1 | B | Aceitar | Não causará tanto dano, sendo fácil de resolver ao implementar uma mensagem de erro |
| 4 | Listar eventos com filtros especializados | 4 | 3 | A | Mitigar | Afeta a visualização direta dos eventos |
| 5 | Cadastrar um novo participante com evento válido | 1 | 5 | B | Transferir | Impacta no envio das notificações |
| 6 | Validar e-mail na função `isEmail()` | 1 | 4 | B | Aceitar | Impacta no envio das notificações |
| 7 | Criar uma nova inscrição | 4 | 5 | C | Mitigar | Existem múltiplas possibilidades de erro (evento inexistente, participante inexistente, etc) |
| 8 | Inscrição de participante com evento inexistente | 3 | 3 | M | Transferir | Existem camadas para corrigir |

 ### 5.0 Técnicas e Níveis Selecionados
 | Item / Camada | Nível(is) | Técnica(s) | Justificativa |
| ----- | ------ | ----- | ----- |
|Autenticação | Endpoint/Integração | Segurança/Regressão | Garante o controle de acesso e impede vazamentos. |
| Notificação / E-mail | Integração | Recuperação/Performance | Garante o disparo assíncrono sem travar a API. |
|Eventos e Participantes | Endpoint | Regressão/Segurança | Assegura que as regras e permissões não sejam violadas |
|Camada de dados | Integração | Segurança/Regressão |Garante a integridade do banco |

### 6.0 Critérios de entrada e de saída
#### 6.1 Critérios de entrada
 - [x] Repositório criado e as devidas dependências instaladas.
 - [x] Banco de dados de testes configurado e separado no ambiente dev.

 #### 6.2 Critérios de saída
 - [x] 100% dos 5 maiores riscos do sistema testados e com status aprovados
 - [x] Suítes de testes automatizados executando sem falhas
 - [x] Mínimo de 80% de cobertura de código nas camadas de Services e Controllers

 ## 7.0 Ambientes e ferramentas
| Item | Definição |
| :----- | :------ |
| Runtime | Node.js v20.15.0 |
| Banco de dados de teste | MySQL 8.0 CE |
| FrameWork de teste | Jest |
| Teste de endpoint |  |
| Serviço de e-mail nos testes | MailPit |
| Variáveis de Ambiente | .env.teste |
| Local de Execução | Local e  |



