ers/20240320222106-accounts.mjs
'use strict';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface) => {
  await queryInterface.bulkInsert('accounts', [
    {
      nik: faker.string.numeric(16),
      email: 'papa@gmail.com',
      name: 'Sigit Pramono',
      address: faker.location.streetAddress(),
      role: 'admin',
      noTelp: '08' + faker.string.numeric(10),
      password: bcrypt.hashSync('papa1234', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      nik: faker.string.numeric(16),
      email: 'admin2@gmail.com',
      name: 'Junaedi Akbar',
      address: faker.location.streetAddress(),
      role: 'admin',
      noTelp: '08' + faker.string.numeric(10),
      password: bcrypt.hashSync('admin1234', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete('accounts', null, {});
};