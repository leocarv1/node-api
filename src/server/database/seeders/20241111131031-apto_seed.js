'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('apartments', [
      {
        number: '101',
        floor: '1',
      },
      {
        number: '102',
        floor: '1',
      },
      {
        number: '103',
        floor: '1',
      },
      {
        number: '201',
        floor: '2',
      },
      {
        number: '202',
        floor: '2',
      },
      {
        number: '203',
        floor: '2',
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('apartments', null, {});
  }
};
