const appEmitter = require('./eventEmitter');
const { Notificacao, Participante, Evento, Inscricao } = require('../models');
const EmailService = require('../services/EmailService');
const confirmacaoInscricao = require('../templates/email/confirmacaoInscricao');
const cancelamentoInscricao = require('../templates/email/cancelamentoInscricao');
const criacaoParticipante = require('../templates/email/criacaoParticipante');

async function buscarDadosInscricao(inscricaoId) {
  return await Inscricao.findByPk(inscricaoId, {
    include: [
      { model: Evento, as: 'evento' },
      { model: Participante, as: 'participante' },
    ],
  });
}

async function buscarDadosParticipante(participante_id) {
  return await Participante.findByPk(participante_id, { raw: true });
}

async function salvarNotificacao(dados) {
  return await Notificacao.create(dados);
}

async function verificarDuplicata(inscricaoId) {
  const jaNotificado = await Notificacao.findOne({
    where: {
      inscricao_id: inscricaoId,
      tipo: 'confirmacao',
      enviada: true,
    }
  });
  return !!jaNotificado;
}

appEmitter.on('inscricao:criada', async (inscricao) => {
  try {
    console.log(`[OBSERVER] Nova inscrição detectada: #${inscricao.id}`);

    const existeDuplicata = await verificarDuplicata(inscricao.id);
    if (existeDuplicata) {
      console.log(`[NOTIFICAÇÃO] Confirmação já enviada, ignorando duplicata!`);
      return;
    }

    const dados = await buscarDadosInscricao(inscricao.id);
    if (!dados) return;

    const { evento, participante } = dados;
    const assunto = `Inscrição confirmada: ${evento.nome}`;

    const html = confirmacaoInscricao({
      participanteNome: participante.nome,
      eventoNome: evento.nome,
      eventoData: evento.data,
      eventoLocal: evento.local,
    });

    const resultado = await EmailService.enviar(participante.email, assunto, html);

    await salvarNotificacao({
      tipo: 'welcome',
      destinatario_email: participante.email,
      assunto,
      conteudo: html,
      data_envio: new Date(),
      enviada: true,
    });

    console.log(`[NOTIFICAÇÃO] Confirmação enviada para ${participante.email}`);
    if (resultado?.visualizarEm) console.log(`   Visualizar em: ${resultado.visualizarEm}`);
  } catch (erro) {
    console.error('[NOTIFICAÇÃO] Erro em inscricao:criada:', erro.message);
  }
});

appEmitter.on('inscricao:cancelada', async (inscricao) => {
  try {
    console.log(`[OBSERVER] Inscrição cancelada detectada: #${inscricao.id}`);
    const dados = await buscarDadosInscricao(inscricao.id);
    if (!dados) return;

    const { evento, participante } = dados;
    const assunto = `Inscrição cancelada: ${evento.nome}`;

    const html = cancelamentoInscricao({
      participanteNome: participante.nome,
      eventoNome: evento.nome,
    });

    const resultado = await EmailService.enviar(participante.email, assunto, html);

    await salvarNotificacao({
      inscricao_id: inscricao.id,
      tipo: 'cancelamento',
      destinatario_email: participante.email,
      assunto,
      conteudo: html,
      data_envio: new Date(),
      enviada: true,
    });

    console.log(`[NOTIFICAÇÃO] Cancelamento enviado para ${participante.email}`);
    if (resultado?.visualizarEm) console.log(`   Visualizar em: ${resultado.visualizarEm}`);
  } catch (erro) {
    console.error('[NOTIFICAÇÃO] Erro em inscricao:cancelada:', erro.message);
  }
});

appEmitter.on('participante:criado', async (participante) => {
  try {
    console.log(`[OBSERVER] Novo participante detectado: #${participante.id}`);

    const dadosParticipante = await buscarDadosParticipante(participante.id);
    if (!dadosParticipante) return;

    const assunto = `Boas-vindas!🎉`;

    const html = criacaoParticipante({
      participanteNome: dadosParticipante.nome,
    });

    const resultado = await EmailService.enviar(dadosParticipante.email, assunto, html);

    await salvarNotificacao({
      inscricao_id: null,
      participante_id: dadosParticipante.id,
      tipo: 'welcome',
      destinatario_email: dadosParticipante.email,
      assunto,
      conteudo: html,
      data_envio: new Date(),
      enviada: true,
    });

    console.log(`[NOTIFICAÇÃO] Boas-vindas enviada para ${dadosParticipante.email}`);
    if (resultado?.visualizarEm) console.log(`   Visualizar em: ${resultado.visualizarEm}`);
  } catch (erro) {
    console.error('[NOTIFICAÇÃO] Erro em participante:criado:', erro.message);
  }
});