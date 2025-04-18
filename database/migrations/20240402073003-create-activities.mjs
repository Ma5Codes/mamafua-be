'use strict';
/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  await queryInterface.createTable('activities', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    action: {
      type: Sequelize.STRING
    },
    notaId: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    time: {
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
};

export const down = async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('activities');
};