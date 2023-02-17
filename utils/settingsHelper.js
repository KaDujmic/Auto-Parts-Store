module.exports.NOTIFICATION_LIST = [
  {
    key: 'order_confirmation',
    template: {
      title: 'Auto Parts Store: Your order has been confirmed!',
      body: `Dear customerName,
    
    The order you have placed has been confirmed. We will contact you once your order is ready for pickup. 
    

    Thank you for your purchase,
    Auto Parts Store`
    }
  },
  {
    key: 'order_arrived',
    template: {
      title: 'Auto Parts Store: Your order has arrived!',
      body: `Dear customerName,

  
    The order you have placed on orderDate is ready.
    Please come by our shop during working hours to pick up your order.
    
    We are looking forward to seeing you!
    
    Auto Parts Store`
    }
  },
  {
    recurrence: '1',
    key: 'order_pickup_recurring',
    template: {
      title: 'Auto Parts Store: Order Reminder',
      body: `Dear customerName,
  
    The order you have placed on orderDate is waiting for pickup. 
    Please come by our shop during working hours to pick up your order.

    We are looking forward to seeing you!
    
    Auto Parts Store`
    }
  }
];
