// Módulos internos do projeto
const ParticipanteModel = require('../models/ParticipanteModel');
const { NotFoundError, ValidationError } = require('../errors/AppError');
const {
  isRequired,
  isEmail,
  minLegth,
  validar,
} = require('../helpers/validators');
const Participante = require('../models/ParticipanteModel');
const appEmitter = require('../events/eventEmitter');


async function listarTodos() {

  const participante = await Participante.findAll({
    order: [['nome', 'ASC']]
  });
  return participante;
}

async function buscarPorId(id) {
  const participante = await Participante.findByPk(id);

  if (!participante) {
    throw new NotFoundError('Participante');
  }

  return participante;
}

async function criar(dados) {
  try {
    const novoParticipante = await Participante.create(dados);
    appEmitter.emit('participante:criado', novoParticipante);
    return novoParticipante;

  } catch (erro) {
    // O Sequelize lança SequelizeValidationError para validações do Model
    if (erro.name === 'SequelizeValidationError') {
      const mensagens = erro.errors.map(e => e.message).join('; ');
      throw new ValidationError(mensagens);
    }
    throw erro;
  }
}

async function atualizar(id, dados) {
  try {
    const participante = await buscarPorId(id);

    await participante.update(dados);
    return participante;
  } catch (erro) {
    if (erro.name === 'SequelizeValidationError') {
      const mensagens = erro.errors.map(e => e.message).join('; ');
      throw new ValidationError(mensagens);
    }
  }
}

async function deletar(id) {
  try {
    const participante = await Participante.findByPk(id);
    if (!participante) {
      throw new NotFoundError('Participante')
    };
  } catch (erro) {
    if (erro.name === 'SequelizeValidationError') {
      const mensagens = erro.errors.map(e => e.message).join('; ');
      throw new ValidationError(mensagens);
    }
  }}

  module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar
  };