const { Inscricao, Participante } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');
const Evento = require('../models/EventoModel');
const appEmitter = require('../events/eventEmitter');
const app = require('../app');

const InscricaoService = require('../services/InscricaoService'); 

async function store(dados) {
    console.log("🚀 MENSAGEM DO SERVICE: A função criar foi executada com os dados:", dados);

    const evento_id = dados.evento_id || dados.eventoId;
    const participante_id = dados.participante_id || dados.participanteId;
    
    console.log(`🔍 IDs extraídos -> Evento: ${evento_id}, Participante: ${participante_id}`);

    const evento = await Evento.findByPk(evento_id);
    if (!evento) throw new NotFoundError('Evento');
    
    const participante = await Participante.findByPk(participante_id);
    if (!participante) throw new NotFoundError('Participante');
    
    const jaInscrito = await Inscricao.findOne({
        where: { evento_id: evento_id, participante_id: participante_id }
    });
    if (jaInscrito) throw new ValidationError('Participante já inscrito neste evento');
    
    // Salva no banco de dados
    const novaInscricao = await Inscricao.create({
        evento_id: evento_id,
        participante_id: participante_id,
    });

    // Emitir evento — Avisa tanto o logObserver quanto o notificacaoObserver
    appEmitter.emit('inscricao:criada', novaInscricao);
    
    return novaInscricao;
}


async function listarTodas() {
    return await Inscricao.findAll({
        include: [
            { model: Evento, as: 'evento', attributes: ['id', 'nome', 'data'] },
            { model: Participante, as: 'participante', attributes: ['id', 'nome', 'email'] },
        ],
        order: [['createdAt', 'DESC']],
    });
}

async function listarPorEvento(evento_id) {
    const evento = await Evento.findByPk(evento_id);
    if (!evento) throw new NotFoundError('Evento');

    return await Inscricao.findAll({
        where: { evento_id: evento_id },
        include: [{ model: Participante, as: 'participante' }]
    });
}

async function cancelar(id) {
    const inscricao = await Inscricao.findByPk(id);
    if (!inscricao) throw new NotFoundError("Inscrição");
    
    await inscricao.update({ status: 'cancelada' });
    
    appEmitter.emit('inscricao:cancelada', inscricao);
    return true;
}

async function buscarComDetalhes(id) {
    const inscricao = await Inscricao.findByPk(id, {
        include: [
            { model: Evento, as: 'evento', attributes: ['id', 'nome', 'data'] },
            { model: Participante, as: 'participante', attributes: ['id', 'nome', 'email'] }
        ],
    });

    if (!inscricao) throw new NotFoundError("Inscrição");

    await inscricao.update({ status: 'cancelada' });

    appEmitter.emit('inscricao:cancelada', inscricao);
    return inscricao;
}

module.exports = {
    listarTodas,
    listarPorEvento,
    buscarComDetalhes,
    store,
    cancelar,
};