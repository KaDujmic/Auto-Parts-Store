'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user', [
      {
        id: '20c1297e-58f6-4587-842b-231ff6583086',
        full_name: 'John Doe',
        email: 'john@example.com',
        address: '1st Blvd',
        password: 'test1234',
        phone_number: '+385915969819',
        role_name: 'Salesperson',
        discount: 10.20,
        currency: 'USD',
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      },
      {
        id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
        full_name: 'Mike Smith',
        email: 'mike@example.com',
        address: '4rd Blvd',
        password: 'test1234',
        phone_number: '+3859159692323',
        role_name: 'Customer',
        discount: 15.00,
        currency: 'USD',
        created_at: new Date(),
        updated_at: new Date(),
        deleted: false
      }
    ]);
  },

  async down (queryInterface, Sequelize) {}
};
