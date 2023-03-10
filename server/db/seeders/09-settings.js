'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('settings', [
      {
        key: 'order_confirmation_template',
        value: {
          title: 'Auto Parts Store: Your order has been confirmed!',
          body: `<body style="background-color:white">
          <table align="center" border="0" cellpadding="0" cellspacing="0" 
                 width="600" bgcolor="AliceBlue">
              <tbody>
                  <tr>
                      <td align="center">
                          <br />
                          <table align="center" border="0" cellpadding="50"
                                 cellspacing="0" class="col-550" width="550">
                              <tbody>
                                <h3>Dear customerName,</h3>
    
                                <p>The order you have requested has been confirmed.<br>
                                We will contact you once your order is ready for pickup.</p><br>
                      
                                Thank you for your purchase,<br>
                        
                                <em>Auto Parts Store</em>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
        </body>`
        },
        deleted: false
      },
      {
        key: 'order_ready_template',
        value: {
          title: 'Auto Parts Store: Your order is ready!',
          body: `<body style="background-color:white">
          <table align="center" border="0" cellpadding="0" cellspacing="0" 
                 width="600" bgcolor="AliceBlue">
              <tbody>
                  <tr>
                      <td align="center">
                          <br />
                          <table align="center" border="0" cellpadding="50"
                                 cellspacing="0" class="col-550" width="550">
                              <tbody>
                                <h3>Dear customerName,</h3>
      
                                <p>The order you have requested is ready.<br>
                                Please come by our shop during working hours to pick up your order.</p>
                    
                                We are looking forward to seeing you!<br>
                      
                                <em>Auto Parts Store</em>
                                </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
        </body>`
        },
        deleted: false
      },
      {
        key: 'order_pickup_template',
        value: {
          title: 'Auto Parts Store: Order Reminder',
          body: `<body style="background-color:white">
          <table align="center" border="0" cellpadding="0" cellspacing="0" 
                 width="600" bgcolor="AliceBlue">
              <tbody>
                  <tr>
                      <td align="center">
                          <br />
                          <table align="center" border="0" cellpadding="50"
                                 cellspacing="0" class="col-550" width="550">
                              <tbody>
                                <h3>Dear customerName,</h3>
      
                                <p>The order you have requested on orderDate is waiting for pickup.<br>
                                Please come by our shop during working hours to pick up your order.</p><br>
                        
                                <p>We are looking forward to seeing you!</p>
                          
                                <p><em>Auto Parts Store</em></p>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
        </body>`
        },
        deleted: false
      },
      {
        key: 'order_pickup_recurrence',
        value: { recurrence: '1' },
        deleted: false
      },
      {
        key: 'item_arrival_template',
        value: {
          title: 'Auto Parts Store: Item Reminder',
          body: `<body style="background-color:white">
          <table align="center" border="0" cellpadding="0" cellspacing="0" 
                 width="600" bgcolor="AliceBlue">
              <tbody>
                  <tr>
                      <td align="center">
                          <br />
                          <table align="center" border="0" cellpadding="50"
                                 cellspacing="0" class="col-550" width="550">
                              <tbody>
                              <p>Good Morning,</p>
      
                              <p>This is a reminder to review today's received order items.<br>
                              Please confirm all items from the list below have arrived at the store.</p>
                              <p>Items:</p>
                              <p>itemList</p>
                              
                              <p>Thank you!</p>
                              </tbody>
                          </table>
                      </td>
                  </tr>
              </tbody>
          </table>
        </body>`
        },
        deleted: false
      }
    ], {}, { value: { type: new Sequelize.JSONB() } });
  },

  async down (queryInterface, Sequelize) { }
};
