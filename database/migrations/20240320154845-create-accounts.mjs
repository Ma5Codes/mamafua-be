'use strict';
import { Sequelize } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface) => {
  await queryInterface.createTable('accounts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    nik: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
    noTelp: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable('accounts');
};