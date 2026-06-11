// Módulos internos do projeto
const ParticipanteService = require("../services/ParticipanteService");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, isEmail, minLength, validar } = require("../helpers/validators");
const parseId = require("../helpers/parseId");

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
async function store(req, res, next) {
  try {
    const novoParticipante = await ParticipanteService.criar(req.body);
    res.status(201).json(novoParticipante);
  } catch (erro) {
    next(erro);
  }
}

// PUT (atualizar) - Requisição refatorada, usando next, try e catch

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id); 
    const participanteAtualizado = await ParticipanteService.atualizar(id, req.body);
    res.status(200).json(participanteAtualizado);
  } catch (erro) {
    next(erro);
  }
}

async function destroy(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const participanteDeletado = await ParticipanteService.deletar(id)
    res.status(204).end(); 
  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy
};