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
			{
				name: 'Bilac',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Araçatuba',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Birigui',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Guararapes',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'São Paulo',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Guarulhos',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Olavo Bilac',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Valparaíso',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Diadema',
				created_at: new Date(),
				updated_at: new Date(),
			},
		], {});
	},
	
	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('cities', null, {});
	}
};
