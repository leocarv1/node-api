'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('cities', [
			{
				name: 'New York',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Los Angeles',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Chicago',
				created_at: new Date(),
				updated_at: new Date(),
			},
		], {});
	},
	
	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('cities', null, {});
	}
};
