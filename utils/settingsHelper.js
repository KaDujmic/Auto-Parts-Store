const NOTIFICATION_LIST = [{
  key: 'order_notification_recurrence',
  value: '1',
  // eslint-disable-next-line max-len
  template: `Dear {full_name},
  
  The order you have placed on {order_date} has arrived, and is ready for pickup.
  
  Please stop by our shop during our working hours.
  
  
  We are looking forward to seeing you!
  
  Auto Parts Store`
}];
module.exports = NOTIFICATION_LIST;
