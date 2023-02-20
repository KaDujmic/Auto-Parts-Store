'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('settings', [
      {
        key: 'order_confirmation_template',
        value: {
          title: 'Auto Parts Store: Your order has been confirmed!',
          body: `Dear customerName,
        
        The order you have placed has been confirmed. We will contact you once your order is ready for pickup. 
        
    
        Thank you for your purchase,
        Auto Parts Store`
        }
      },
      {
        key: 'order_arrived_template',
        value: {
          title: 'Auto Parts Store: Your order has arrived!',
          body: `Dear customerName,
      
        The order you have placed on orderDate is ready.
        Please come by our shop during working hours to pick up your order.
        
        We are looking forward to seeing you!
        
        Auto Parts Store`
        }
      },
      {
        key: 'order_pickup_template',
        value: {
          title: 'Auto Parts Store: Order Reminder',
          body: `Dear customerName,
      
        The order you have placed on orderDate is waiting for pickup. 
        Please come by our shop during working hours to pick up your order.
    
      
        We are looking forward to seeing you!
        
        Auto Parts Store`
        }
      },
      {
        key: 'order_pickup_recurrence',
        value: { recurrence: '1' }
      }
    ], {}, { value: { type: new Sequelize.JSONB() } });
  },

  async down (queryInterface, Sequelize) {}
};
