'use strict';
import { faker } from '@faker-js/faker';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  /**
   * Add seed commands here.
   *
   * Example:
   */
  const listCustomers = [];

  for (let i = 0; i < 50; i++) {
    listCustomers.push({
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      noTelp: '08' + faker.string.numeric(10), // '04812',
    });
  }
  await queryInterface.bulkInsert('customers', [...listCustomers], {});
};

export const down = async (queryInterface, Sequelize) => {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
};