// Módulos internos do projeto
const ParticipanteModel = require('../models/ParticipanteModel');
const {NotFoundError, ValidationError} = require('../errors/AppError');
const {
    isRequired,
    isEmail,
    minLegth,
    validar,
} = require('../helpers/validators');
const Participante = require('../models/ParticipanteModel');

async function listarTodos(){
    
    const participante = await Participante.findAll({
     order: [['nome', 'ASC']]
    });
    return participante;
}

async function buscarPorId(id){
    const participante = await Participante.findByPk(id);

  if (!participante) {
    throw new NotFoundError('Participante');
  }

  return participante;
}

async function criar(dados) {
  try {
    const novoParticipante = await Participante.create(dados);
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

// Atualizar e Deletar vamos implementar na próxima aula
async function atualizar(id, dados) {
  // TODO: próxima aula
}

async function deletar(id) {
  // TODO: próxima aula
}

module.exports = { 
    listarTodos, 
    buscarPorId, 
    criar,
    atualizar,
    deletar
};