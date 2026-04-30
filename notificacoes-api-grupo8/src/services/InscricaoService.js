const { Inscricao, Evento, Participante } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');

async function criar(dados) {
    const { eventoId, participanteId } = dados;
    
    const evento = await Evento.findByPk(eventoId);
    if (!evento) throw new NotFoundError('Evento');
    
    const participante = await Participante.findByPk(participanteId);
    if (!participante) throw new NotFoundError('Participante');
    
    const jaInscrito = await Inscricao.findOne({
        where: { evento_id: eventoId, participante_id: participanteId }
    });
    if (jaInscrito) throw new ValidationError('Participante já inscrito neste evento');
    
    return await Inscricao.create({
        evento_id: eventoId,
        participante_id: participanteId,
    });
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

async function listarPorEvento(eventoId) {
    const evento = await Evento.findByPk(eventoId);
    if (!evento) throw new NotFoundError('Evento');

    return await Inscricao.findAll({
        where: { evento_id: eventoId },
        include: [{ model: Participante, as: 'participante' }]
    });
}

async function cancelar(id) {
    const inscricao = await Inscricao.findByPk(id);
    if (!inscricao) throw new NotFoundError("Inscrição");
    
    await inscricao.destroy();
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
    return inscricao;
}

module.exports = {
    listarTodas,
    listarPorEvento,
    buscarComDetalhes,
    criar,
    cancelar,
};