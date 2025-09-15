'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.ENUM('user', 'admin', 'manager'),
      allowNull: false,
      defaultValue: 'user',
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.changeColumn('users', 'role', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'user',
    });
  }
};
