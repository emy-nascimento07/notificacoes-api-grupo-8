# Teste de Integração — Bloco 4

**Data:** 2/05/20266

**Testador:** Emilly

| # | Teste | Resultado | Observação |
|---|---|---|---|
| 1 | GET /eventos (seed) | ✅  | 3 eventos retornados |
| 2 | POST /eventos | ✅  | 201, evento com ID 4 |
| 3 | POST /participantes | ✅  | 201, participante com ID 4 |
| 4 | POST /inscricoes | ✅  | Inscrição criada |
| 5 | Verificar e-mail (MailPit) | ✅  | E-mail de confirmação bonito |
| 6 | GET /notificacoes | ✅  | enviada: true |
| 7 | POST /inscricoes (duplicada) | ✅  | 400, "já inscrito" |
| 8 | PATCH /inscricoes/:id/cancelar | ✅  | Status "cancelada" |
| 9 | Verificar e-mail cancelamento | ✅  | E-mail de cancelamento |
| 10 | GET /notificacoes/estatisticas | ✅  | total, enviadas, porTipo |
| 11 | POST /notificacoes/1/reenviar | ✅  | E-mail reenviado |
| 12 | GET /exportar/eventos/xml | ✅  | XML válido |
| 13 | GET /exportar/relatorio/inscricoes | ✅  | JSON com inscritos |
| 14 | POST /eventos/2/banner | ✅  | Banner salvo |
| 15 | GET /api-docs | ✅  | Página funcional |
| 16 | Reiniciar servidor | ✅  | Servidor reiniciado |
| 17 | Persistência após reinício | ✅  | Dados mantidos |

**Problemas encontrados:**

- A data estava sendo pedida para a criação de participante.
- Tabela notificações exigindo inscricaoId, mesmo quando o email era enviado apenas para dar boas-vindas.
- Documentação Swagger.

**Correções feitas:**

- Mudança no notificacaoObserver.js para que não seja pedida a data para criação de participante.
- Campo de inscricaoId aceitando nulo.
- Conflito de nomes no documento.
