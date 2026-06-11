# Pesquisa de Mercado — Serviços de Notificação

## Serviços de E-mail Transacional

| Serviço    | Plano Gratuito             | Preço Inicial    | Diferenciais                                                                                    |
| ---------- | -------------------------- | ---------------- | ----------------------------------------------------------------------------------------------- |
| SendGrid   | 100 emails/dia             | US$ 19.95/mês    | Plataforma "all-in-one" robusta, editor de templates visual e líder de mercado.                 |
| Mailgun    | 100 e-mails/dia (3 meses)  | US$ 15/mês       | Foco total em desenvolvedores, excelentes ferramentas de validação de e-mail e logs detalhados. |
| Amazon SES | 3.000 e-mails/mês (1º ano) | US$ 0.10 / 1.000 | O mais barato em escala. Exige maior esforço de configuração e gestão de reputação.             |
| Mailtrap   | 1.000 e-mails/mês          | US$ 15/mês       | Combina infraestrutura de envio com sandbox de testes; excelente para depuração em staging.     |
| Brevo      | 300 e-mails/dia            | US$ 9/mês        | Melhor custo-benefício para pequenos volumes e automação de marketing integrada.                |

## Como o nosso projeto se compara?

Atualmente, nosso projeto foca na simplicidade e no baixo custo. Enquanto serviços como SendGrid e Mailgun oferecem dashboards complexos e analytics avançados, nossa solução busca resolver a entrega imediata com a menor sobrecarga possível. Nos diferenciamos por não exigir uma curva de aprendizado alta para configurações de DNS complexas em fases iniciais, embora tenhamos menos ferramentas de "marketing" do que os grandes players.

## O que poderíamos adotar no futuro?

Multi-channel Notifications: Integrar não apenas e-mail, mas também WhatsApp

* Webhooks de Status: Implementar um sistema que escuta se o e-mail foi aberto ou clicado (tracking), similar ao que o SendGrid oferece.

* Smart Fallback: Se um provedor (ex: Amazon SES) falhar ou cair, o sistema alterna automaticamente para outro (ex: Mailgun) para garantir a entrega.

* A/B Testing de Templates: Permitir testar qual versão de um e-mail transacional converte melhor para o usuário final.
