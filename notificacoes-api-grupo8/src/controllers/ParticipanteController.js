// Módulos internos do projeto
const ParticipanteService = require("../services/ParticipanteService");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, isEmail, minLength, validar } = require("../helpers/validators");
const parseId = require("../helpers/parseId")


// GET (buscar tudo) - Requisição refatorada, usando next, try e catch
async function index(req, res, next) {
  try {
    const participantes = await ParticipanteService.listarTodos();
    res.json(participantes);
  } catch (erro) {
    next(erro);
  }
}


// GET (buscar por ID) - Requisição refatorada, usando next, try e catch
async function show(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const participante = await ParticipanteService.buscarPorId(id);

    res.json(participante);
  } catch (erro) {
    next(erro);
  }
}

// POST (criar) - Requisição refatorada, usando next, try e catch
const InscricaoService = require('../services/ParticipanteService');

async function store(req, res, next) {
  try {
    const novoParticipante = await ParticipanteService.criar(req.body);
    res.status(201).json(novoParticipante);
  } catch (erro) {
    next(erro)
  }
}


//Atualizar e Deletar vamos implementar na próxima aula

async function update(id, dados) {

  const participante = await Participante.findByPk(id);

  if (!participante) {
    throw new NotFoundError('Participante');
  }
  try {
    await participante.update(dados);
    return participante;
  } catch (erro) {

    if (erro.name === 'SequelizeValidationError') {
      const mensagens = erro.errors.map(e => e.message).join('; ');
      throw new ValidationError(mensagens);
    }
    throw erro;
  }

}

async function destroy(id) {
  const participante = await Participante.findByPk(id);
  if (!participante) {
    throw new NotFoundError('Participante');
  }
  await participante.destroy();

  return true;

}


module.exports = {
  index,
  show,
  store,
  update,
  destroy

};