const parseId = require("../helpers/parseId");
const InscricaoService = require("../services/InscricaoService");


async function store(req, res, next) {
  try {
    const novaInscricao = await InscricaoService.store(req.body);
    return res.status(201).json(novaInscricao);
  } catch (erro) {
    console.error("❌ ERRO NO CONTROLLER:", erro.message);
    next(erro); 
  }
}

async function index(req, res, next) {
  try {
    console.log('[DEBUG] GET /inscricoes - iniciando');
    const inscricoes = await InscricaoService.listarTodas();
    console.log('[DEBUG] GET /inscricoes - dados obtidos:', inscricoes.length, 'registros');
    console.log('[DEBUG] Resposta:', JSON.stringify(inscricoes, null, 2));
    res.json(inscricoes);
  } catch (erro) {
    console.error('[DEBUG] GET /inscricoes - ERRO:', erro.message);
    next(erro);
  }
}

async function listarPorEvento(req, res, next) {
  try {
    const eventoId = parseId(req.params.eventoId);
    // Adicionado await
    const inscricoes = await InscricaoService.listarPorEvento(eventoId);
    res.json(inscricoes);
  } catch (erro) {
    next(erro);
  }
}

// DELETE ou PATCH /inscricoes/:id
async function cancelar(req, res, next) {
  try {
    const id = parseId(req.params.id);
    // Adicionado await
    await InscricaoService.cancelar(id);
    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}


async function detalhes(req, res, next) {
  try {
    const id = parseId(req.params.id);
    // Adicionado await
    const detalhesInscricao = await InscricaoService.buscarComDetalhes(id);
    res.json(detalhesInscricao);
  } catch (erro) {
    next(erro);
  }
}

module.exports = {
  store,
  index,
  listarPorEvento,
  cancelar,
  detalhes,
};