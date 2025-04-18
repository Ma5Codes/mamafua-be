'use strict';

import { faker } from '@faker-js/faker/locale/af_ZA';

/** @type {import('sequelize-cli').Migration} */
export const up = async (queryInterface, Sequelize) => {
  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

  const listTransactions = [];
  const services = [
    { name: 'wash-fold', price: '6000' },
    { name: 'wash-complete', price: '8000' },
    { name: 'ironing', price: '5000' },
    { name: 'sheet-3s-number-3/4', price: '10000' },
    { name: 'sheet-3s-number-2', price: '15000' },
    { name: 'sheet-4s-number-1', price: '20000' },
    { name: 'blanket-number-3/4', price: '10000' },
    { name: 'blanket-number-2', price: '15000' },
    { name: 'blanket-number-1', price: '20000' },
    { name: 'double-blanket-number-3/4', price: '30000' },
    { name: 'double-blanket-number-2', price: '40000' },
    { name: 'double-blanket-number-1', price: '50000' },
  ];
  const statusList = ['paid', 'unpaid', 'partial-payment'];

  for (let i = 0; i < 500; i++) {
    const idService = faker.number.int({ min: 0, max: services.length - 1 });
    const weight = faker.number.int({ min: 1, max: 20 });
    const statusIdx = faker.number.int({ min: 0, max: 2 });
    const status = statusList[statusIdx];
    const price = parseInt(services[idService].price) * weight;
    const amountPaymentList = [price, price - 1000, price - 2000];
    const amountPayment =
      status === 'unpaid'
        ? 0
        : status === 'paid'
        ? price
        : amountPaymentList[faker.number.int({ min: 1, max: 2 })];
    const dateDone = faker.date.between({
      from: '2024-04-15T00:00:00.000Z',
      to: '2024-04-30T00:00:00.000Z',
    });
    const dateIn = faker.date.between({
      from: '2024-04-01T00:00:00.000Z',
      to: '2024-04-15T00:00:00.000Z',
    });
    await delay(500);
    listTransactions.push({
      transactionId: 'N' + Date.now(),
      notaId: '100' + i.toString(),
      weight,
      service: services[idService].name,
      price,
      amountPayment,
      perprice: services[idService].price,
      name: faker.person.fullName(),
      noTelp: '08' + faker.string.numeric(10),
      address: faker.location.streetAddress(),
      createdBy: 'papa',
      fkAuthor: 1,
      dateIn,
      dateOut: null,
      dateDone,
      datePayment: status === 'unpaid' || status == null ? null : dateDone,
      status,
      notes: 'note',
      cashier: 'dodo',
      deletedAt: null,
      createdAt: dateIn,
    });
  }
  await queryInterface.bulkInsert('transactions', [...listTransactions], {});
};

export const down = async (queryInterface, Sequelize) => {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
};