'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clients', [
      {
        full_name: 'John Doe',
        email: 'email1@email.com',
        phone: "123321",
        doc: "12334565"
      },
      {
        full_name: 'John Doe 1',
        email: 'email2@email.com',
        phone: "123321",
        doc: "12334565"
      },
      {
        full_name: 'John Doe 2',
        email: 'email3@email.com',
        phone: "123321",
        doc: "12334565"
      },
      {
        full_name: 'John Doe 3',
        email: 'email4@email.com',
        phone: "123321",
        doc: "12334565"
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clients', null, {});
  }
};
