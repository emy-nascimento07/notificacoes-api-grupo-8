
## Integrantes
* Emilly
* Lívia
* Vinícius

---
# Parte 1 — Matriz técnica × camada

## Matriz Técnica × Camada

| Camada / grupo de rotas | Regressão | Segurança | Recuperação | Performance | Estresse | Paralelo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Autenticação (`/auth/*`)** | Média | Alta | Alta | Média | Alta | Fora do escopo |
| **Notificações** | Alta | Média | Alta | Alta | Alta | Fora do escopo |
| **Eventos** | Alta | Alta | Média | Média | Média | Fora do escopo |
| **Participantes / inscrições** | Alta | Alta | Alta | Média | Média | Fora do escopo |
| **Envio de e-mail (Nodemailer/MailPit)** | Média | Média | Alta | Alta | Alta | Fora do escopo |
| **Camada de dados (models + MySQL)** | Alta | Alta | Alta | Alta | Média | Fora do escopo |

---

## Justificativas (Somente células "Alta" e "Fora do escopo")

### Autenticação (`/auth/*`)
* **Autenticação × Segurança — ALTA:** Cuida do login e tokens. Se falhar, qualquer um entra no sistema.
* **Autenticação × Recuperação — ALTA:** Se o serviço cair, precisa voltar sem travar as conexões ativas.
* **Autenticação × Estresse — ALTA:** Muito acesso de login ao mesmo tempo não pode derrubar a entrada do sistema.
* **Autenticação × Paralelo — FORA DO ESCOPO:** Não existe sistema antigo rodando junto pra comparar.

### Notificações
* **Notificações × Regressão — ALTA:** Alterar o código não pode quebrar os avisos que já funcionavam.
* **Notificações × Recuperação — ALTA:** Se a fila cair, não pode perder nem duplicar avisos ao voltar.
* **Notificações × Performance — ALTA:** O envio precisa ser rápido pro usuário não sentir travamento.
* **Notificações × Estresse — ALTA:** Tem que aguentar disparos em massa sem travar.
* **Notificações × Paralelo — FORA DO ESCOPO:** Não existe versão antiga rodando ao mesmo tempo.

### Eventos
* **Eventos × Regressão — ALTA:** Mexer no código não pode sumir com a lista de eventos.
* **Eventos × Segurança — ALTA:** Impede que um usuário apague ou altere o evento dos outros.
* **Eventos × Paralelo — FORA DO ESCOPO:** Sem sistema antigo rodando em paralelo para comparar.

### Participantes / inscrições
* **Participantes × Regressão — ALTA:** Atualizar o código não pode quebrar a tela de cadastro.
* **Participantes × Segurança — ALTA:** Precisa de token pra um usuário não inscrever outro sem permissão.
* **Participantes × Recuperação — ALTA:** Se der erro no cadastro, o banco deve desfazer a ação e não salvar dados incompletos.
* **Participantes × Paralelo — FORA DO ESCOPO:** Não há outro sistema rodando em paralelo.

### Envio de e-mail (Nodemailer/MailPit)
* **Envio de e-mail × Recuperação — ALTA:** Se o servidor de e-mail cair, o sistema deve tentar de novo sem perder a mensagem.
* **Envio de e-mail × Performance — ALTA:** O disparo deve ser assíncrono pro usuário não ficar esperando a tela carregar.
* **Envio de e-mail × Estresse — ALTA:** Deve suportar disparos massivos sem travar a aplicação.
* **Envio de e-mail × Paralelo — FORA DO ESCOPO:** É uma integração direta de serviço, não tem versão paralela.

### Camada de dados (models + MySQL)
* **Camada de dados × Regressão — ALTA:** Mudar buscas no banco não pode quebrar o resto do sistema.
* **Camada de dados × Segurança — ALTA:** Evita invasões por *SQL Injection* e vazamento de dados.
* **Camada de dados × Recuperação — ALTA:** Se o banco cair, deve fazer *rollback* e manter os dados corretos.
* **Camada de dados × Performance — ALTA:** Consultas lentas deixam o sistema inteiro devagar.
* **Camada de dados × Paralelo — FORA DO ESCOPO:** Não tem banco antigo rodando em paralelo.

---

## Parte 2 — Escopo

### 2.1 - Técnicas que ficam dentro do escopo

| Técnica | Ferramenta prevista | Em que nível será aplicada |
| :--- | :--- | :--- |
| **Estresse** | Insomnia | `POST /eventos` — Criar múltiplos eventos em sequência para testar a carga do servidor |
| **Estresse** | Insomnia | `POST /notificacoes/teste-email` — Disparos múltiplos de e-mail para validar acúmulo na fila |
| **Recuperação** | Insomnia | `DELETE /eventos/:id` — Tentar deletar um evento com ID inexistente (ex.: ID 9999) |
| **Recuperação** | Insomnia | `PUT /eventos/:id` — Atualizar evento passando corpo JSON com dados inválidos ou vazios |
| **Recuperação** | Insomnia | `POST /inscricoes` — Tentar cadastrar inscrição com ID de evento ou participante inexistente |
| **Performance** | Insomnia | `GET /eventos` — Medir tempo de resposta da listagem com suporte a cache |
| **Segurança** | Insomnia | `POST /participantes` — Enviar dados maliciosos nos campos de cadastro |
| **Segurança** | Insomnia | `POST /eventos/:id/banner` — Tentar enviar arquivo que não seja imagem ou maior que 5MB |


#### 2.2 - Técnicas que não ficam dentro do escopo

| Técnica descartada | Motivo | Tipo de motivo |
| :--- | :--- | :--- |
| **Paralelo** | Não existe uma versão legada ou sistema antigo rodando simultaneamente para comparar execuções em paralelo. | Não se aplica ao sistema |
| **Estresse (Análise de infraestrutura)** | Ausência de requisitos não funcionais documentados estabelecendo metas explícitas de tempo de resposta ou limites de carga. | Falta de requisito |
| **Recuperação (Failover e Hardware)** | Tempo restrito nas aulas da UC para criar cenários de simulação de queda física de servidores, banco de dados ou tolerância a falhas. | Falta de tempo |

---

#### 2.3 - Riscos aceitos ao não cobrir as técnicas

* **Risco de não rodar Recuperação avançada (Falta de tempo):** O projeto aceita o risco de o sistema ficar indisponível ou corromper conexões temporariamente caso haja uma queda física do servidor MySQL ou falha repentina de infraestrutura.
* **Risco de não rodar Estresse completo (Falta de requisito):** O projeto aceita o risco de degradação severa da aplicação caso ocorra um pico inesperado de acessos reais acima da capacidade do servidor.

## Parte 3 — Verificações de segurança

| # | O que verificar | Nível | Resultado esperado |
| :--- | :--- | :--- | :--- |
| **1** | Envio de comandos SQL no parâmetro de busca do cadastro| API / Controller | O sistema deve sanitizar a entrada, retornar erro '400' e barrar a execução da query maliciosa. |
| **2** | Tentativa de alteração não autorizada em evento de outro organizador sem enviar o token de autenticação | Rota / Middleware | A API deve barrar a requisição e retornar '401' ou '403' sem modificar os dados. |
| **3** | Proteção de dados no banco: Validação da gravação da senha do usuário na tabela do MySQL após o cadastro | Banco de dados (MySQL) | A senha deve ser gravada em hash criptografado.|

## Parte 4 - Regressão no calendário

##### 4.1 - O grupo rodará a suíte antes de cada entrega, confirmando que a API funciona.
##### 4.2 - Emilly, passando o resultado para todos do grupo.
##### 4.3 - O grupo analisa o que está dando erro e corrige.