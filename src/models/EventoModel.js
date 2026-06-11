const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Evento = sequelize.define(
  "Evento",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Nome não pode ser vazio" },
        len: { args: [3, 255], msg: "Nome deve ter entre 3 e 255 caracteres" },
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Data não pode ser nula" },
        notEmpty: { msg: "Data não pode estar vazia" },
        isDate: { msg: "Data deve ser um formato de data válido" },
      }
    },
    local: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capacidade: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: { args: [1], msg: "Capacidade deve ser pelo menos 1" },
      },
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "eventos",
    timestamps: true, // cria createdAt e updatedAt automaticamente
    underscored: true,
  },
);



module.exports = Evento;
