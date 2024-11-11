'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('reservations', 'active', { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false });

    await queryInterface.addColumn('reservations', 'date_initial', { type: Sequelize.DATE, allowNull: false });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('reservations', 'active');
    queryInterface.removeColumn('reservations', 'date_initial');
  }
};
