const Usuario = require("../models/UsuarioModel");

const somenteAdmin = async (req, res, next) => {
  try {
    const usuarioId = req.usuarioId;

    if (!usuarioId) {
      return res.status(401).json({ mensagem: "Usuário não autenticado" });
    }

    const usuario = await Usuario.findByPk(usuarioId);

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    if (usuario.papel !== "admin") {
      return res.status(403).json({ mensagem: "Acesso negado: recurso exclusivo para administradores" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao verificar permissão do usuário", erro: error.message });
  }
};

module.exports = somenteAdmin;