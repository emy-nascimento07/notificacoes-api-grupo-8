const baseTemplate = require('./baseTemplate');

function lembreteEvento(dados) {

  const { participanteNome, eventoNome, eventoData, eventoLocal } = dados;

  // Calcular quantos dias faltam
  const hoje = new Date();
  const dataEvento = new Date(eventoData);
  const diffMs = dataEvento - hoje;
  const diasFaltando = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const conteudo = `

    <h2>Lembrete: Evento se aproxima! ⏰</h2>

    <p>Olá <strong>${participanteNome}</strong>,</p>

    <p>Passando para te lembrar sobre o Evento: ${eventoNome}, como está a ansiedade?😁</p>
    <p>Só faltam <strong>${diasFaltando}</strong> para você vivenciar os melhores dias da sua vida!! </p>

    <div class="info-box">
      <p>Caso possua dúvidas, entre em contato conosco para mais informações.</p>
    </div>

  `;

  return baseTemplate(conteudo);

}

module.exports = lembreteEvento;
