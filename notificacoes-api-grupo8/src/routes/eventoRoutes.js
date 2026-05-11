const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const EventoController = require("../controllers/EventoController");
const cacheMiddleware = require("../middlewares/cacheMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Evento:
 *       type: object
 *       required:
 *         - nome
 *         - data
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         nome:
 *           type: string
 *           description: Nome do evento
 *         descricao:
 *           type: string
 *           description: Descrição do evento
 *         data:
 *           type: string
 *           description: Data do evento
 *         local:
 *           type: string
 *           description: Local do evento
 *         capacidade:
 *           type: integer
 *           description: Capacidade máxima
 *       example:
 *         id: 1
 *         nome: Workshop de Node.js
 *         descricao: Aprenda Node.js do zero
 *         data: "2025-08-15"
 *         local: SENAI - Sala 3
 *         capacidade: 30
 */

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Listar todos os eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 */
router.get("/", cacheMiddleware(30), EventoController.index);

/**
 * @swagger
 * /eventos/futuros:
 *   get:
 *     summary: Listar eventos futuros
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos futuros
 *       404:
 *         description: Não existem eventos futuros
 */
router.get("/futuros", EventoController.futuros);

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Buscar evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Evento não encontrado
 */
router.get("/:id", cacheMiddleware(60), EventoController.show);

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Criar um novo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - data
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data:
 *                 type: string
 *               local:
 *                 type: string
 *               capacidade:
 *                 type: integer
 *             example:
 *               nome: "Palestra sobre APIs"
 *               descricao: "Como construir APIs profissionais"
 *               data: "2025-10-10"
 *               local: "SENAI - Sala 5"
 *               capacidade: 50
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", EventoController.store);

/**
 * @swagger
 * /eventos/{id}:
 *   put:
 *     summary: Atualizar um evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data:
 *                 type: string
 *               local:
 *                 type: string
 *               capacidade:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Evento atualizado
 *       404:
 *         description: Evento não encontrado
 */
router.put("/:id", EventoController.update);

/**
 * @swagger
 * /eventos/{id}:
 *   delete:
 *     summary: Deletar um evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Evento deletado
 *       404:
 *         description: Evento não encontrado
 */
router.delete("/:id", EventoController.destroy);

router.post("/:id/banner", upload.single("banner"), async (req, res, next) => {
  try {
    const { Evento } = require("../models");

    const evento = await Evento.findByPk(req.params.id);

    if (!evento) {
      return res.status(404).json({
        erro: "Evento não encontrado",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        erro: "Nenhum arquivo enviado",
      });
    }

    // Salvar o caminho do arquivo no banco
    await evento.update({
      banner: `/uploads/${req.file.filename}`,
    });

    res.json({
      mensagem: "Banner atualizado com sucesso",
      banner: `/uploads/${req.file.filename}`,
    });
  } catch (erro) {
    next(erro);
  }
});

/**
 * @swagger
 * /eventos/{id}/banner:
 *   post:
 *     summary: Upload de banner para um evento
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               banner:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem (png, jpg, jpeg)
 *     responses:
 *       200:
 *         description: Banner atualizado com sucesso
 *         content:
 *           application/json:
 *             example:
 *               mensagem: "Banner atualizado com sucesso"
 *               banner: "/uploads/12345-imagem.jpg"
 *       400:
 *         description: Nenhum arquivo enviado
 *       404:
 *         description: Evento não encontrado
 */

/**
 * @swagger
 * tags:
 *   - name: Exportação
 *     description: Endpoints para geração de relatórios e exportação de dados
 */

/**
 * @swagger
 * /exportar/eventos/xml:
 *   get:
 *     summary: Exportar todos os eventos em formato XML
 *     tags: [Exportacao]
 *     responses:
 *       200:
 *         description: Arquivo XML gerado com sucesso
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /exportar/eventos/json:
 *   get:
 *     summary: Exportar todos os eventos em JSON (Download)
 *     tags: [Exportacao]
 *     responses:
 *       200:
 *         description: Arquivo JSON para download
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 */

/**
 * @swagger
 * /exportar/relatorio/inscricoes:
 *   get:
 *     summary: Relatório detalhado de inscrições por evento
 *     tags: [Exportacao]
 *     responses:
 *       200:
 *         description: JSON contendo estatísticas e lista de inscritos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 geradoEm:
 *                   type: string
 *                   format: date-time
 *                 totalEventos:
 *                   type: integer
 *                 relatorio:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       evento:
 *                         type: string
 *                       totalInscritos:
 *                         type: integer
 *                       vagasRestantes:
 *                         type: integer
 */

module.exports = router;