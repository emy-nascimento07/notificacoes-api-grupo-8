const { Evento } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');
const appEmitter = require('../events/eventEmitter');

async function buscarPorId(id) {
  const evento = await Evento.findByPk(id);
  if (!evento) {
    throw new NotFoundError('Evento');
  }
  return evento;
}

async function criar(dados) {
  const { nome, descricao, data, local, capacidade, banner } = dados;
  try {

    const novoEvento = await Evento.create({
      nome: nome,
      descricao: descricao,
      data: data,
      local: local,
      capacidade: capacidade,
      banner: banner,
    });

    appEmitter.emit('evento:criado', novoEvento);
    return novoEvento;

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

  const evento = await Evento.findByPk(id);

  if (!evento) {

    throw new NotFoundError('Evento');

  }

  try {
    await evento.update(dados);
    return evento;
  } catch (erro) {

    if (erro.name === 'SequelizeValidationError') {
      const mensagens = erro.errors.map(e => e.message).join('; ');
      throw new ValidationError(mensagens);
    }
    throw erro;
  }

}

async function deletar(id) {
  const evento = await Evento.findByPk(id);
  if (!evento) {
    throw new NotFoundError('Evento');
  }

  await evento.destroy();

  appEmitter.emit('evento:deletado', evento);
  return true;
}

async function listarTodos(opcoes = {}) {
  const {
    pagina = 1,
    porPagina = 10,
    ordenarPor = 'data',
    ordem = 'ASC',
    busca = null,
  } = opcoes;

  // Construir filtro de busca
  const where = {};
  if (busca) {
    const { Op } = require('sequelize');
    where.nome = { [Op.like]: `%${busca}%` };
  }

  // Buscar com paginação
  const { count, rows } = await Evento.findAndCountAll({
    where,
    order: [[ordenarPor, ordem.toUpperCase()]],
    limit: parseInt(porPagina),
    offset: (parseInt(pagina) - 1) * parseInt(porPagina),
  });

  return {
    dados: rows,
    total: count,
    pagina: parseInt(pagina),
    porPagina: parseInt(porPagina),
    totalPaginas: Math.ceil(count / parseInt(porPagina)),
  };
}

async function listarFuturos() {
  const { Op } = require('sequelize');

  const eventos = await Evento.findAll({
    where: {
      data: {
        [Op.gt]: new Date() // Operador "maior que": Op.gt
      }
    },
    order: [['data', 'ASC']],
  });

  return eventos;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  listarFuturos
};