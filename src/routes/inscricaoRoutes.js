const express = require("express");
const router = express.Router();
const InscricaoController = require("../controllers/InscricaoController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Inscricao:
 *       type: object
 *       required:
 *         - evento_id
 *         - participante_id
 *         - dataInscricao
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         evento_id:
 *           type: integer
 *           description: ID do evento
 *         participante_id:
 *           type: integer
 *           description: ID do participante
 *         dataInscricao:
 *           type: string
 *           description: Data da Inscrição
 *         status:
 *           type: string
 *           description: Status da Inscrição
 *       example:
 *         id: 1
 *         evento_id: 2
 *         participante_id: 1
 *         dataInscricao: "2026-02-25"
 *         status: "confirmada"
 *     Erro:
 *       type: object
 *       properties:
 *         erro:
 *           type: object
 *           properties:
 *             tipo:
 *               type: string
 *               example: NotFoundError
 *             mensagem:
 *               type: string
 *               example: Inscrição não encontrada
 *             statusCode:
 *               type: integer
 *               example: 404
 */

/**
 * @swagger
 * /inscricoes:
 *   post:
 *     summary: Criar uma nova inscrição
 *     tags: [Inscricoes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - evento_id
 *               - participante_id
 *             properties:
 *               evento_id:
 *                 type: integer
 *               participante_id:
 *                 type: integer
 *               dataInscricao:
 *                 type: string
 *               status:
 *                 type: string
 *             example:
 *               evento_id: 2
 *               participante_id: 1
 *               dataInscricao: "2026-02-25"
 *               status: "confirmada"
 *     responses:
 *       201:
 *         description: Inscrição criada com sucesso 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inscrição'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.post("/", InscricaoController.store);

/**
 * @swagger
 * /inscricoes:
 *   get:
 *     summary: Listar todas as inscrições
 *     tags: [Inscricoes]
 *     responses:
 *       200:
 *         description: Lista de inscrições
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inscricao'
 *       404:
 *         description: Nenhum evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/", InscricaoController.index);

/**
 * @swagger
 * /inscricoes/evento/{eventoId}:
 *   get:
 *     summary: Listar inscrições de um evento
 *     tags: [Inscricoes]
 *     parameters:
 *       - in: path
 *         name: evento_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Lista de inscrições do evento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inscricao'
 *       404:
 *         description: Nenhuma inscrição encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Erro'
 */
router.get("/evento/:eventoId", InscricaoController.listarPorEvento);



/**
 * @swagger
 * /inscricoes/{id}/cancelar:
 *   patch:
 *     summary: Cancelar uma inscrição
 *     tags: [Inscricoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscrição cancelada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inscricao'
 *       404:
 *         description: Inscrição não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.patch("/:id/cancelar", InscricaoController.cancelar);

/**
 * @swagger
 * /inscricoes/{id}/detalhes:
 *   get:
 *     summary: Listar detalhes de uma inscrição
 *     tags: [Inscricoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da inscrição
 *     responses:
 *       200:
 *         description: Inscrição encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inscricao'
 *       404:
 *         description: Inscrição não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/:id/detalhes", InscricaoController.detalhes);

module.exports = router;