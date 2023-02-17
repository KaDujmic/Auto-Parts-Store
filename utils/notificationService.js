const nodemailer = require('nodemailer');
const { getCache } = require('./cache.js');
const { user, notification, settings, sequelize } = require('../models');

// Email created on order confirmation
exports.orderConfirmEmail = async function (customerName, customerEmail) {
  let emailTemplate = await getSetting('order_confirmation_template');
  emailTemplate = personalizeEmail(emailTemplate, customerName);

  const mailOptions = createMailOptions(customerEmail, emailTemplate);
  sendEmail(mailOptions);
};

// Email created after order has arrived and ready for pickup
// Customer object's structure:
// {
//    userId: UUID,
//    orderId: UUID,
//    name: STRING (full_name),
//    email: STRING
// }
exports.orderArrivedEmail = async function (customer) {
  let emailTemplate = await getSetting('order_arrived_template');
  emailTemplate = personalizeEmail(emailTemplate, customer.name);

  const mailOptions = createMailOptions(customer.email, emailTemplate);
  sendEmail(mailOptions);

  setUpRecurrenceEmail(customer);
};

// Creates a notification table entry for the recurrence email
async function setUpRecurrenceEmail (customer) {
  const notificationData = {
    user_id: customer.userID,
    order_id: customer.order_ID,
    status: 'scheduled'
  };
  await notification.create({ notificationData });
}

// Send all recurring emails for the day
exports.sendRecurringEmails = async function () {
  const emailTemplate = await getSetting('order_pickup_template');
  const recurranceSetting = await getSetting('order_pickup_recurrence');

  const date = new Date();
  date.setDate(date.getDate() - recurranceSetting.value.recurrence);

  const listOfNotifications = await notification.findAll({
    where: {
      last_sent: {
        [sequelize.Op.lte]: date
      },
      status: 'scheduled'
    },
    include: {
      model: user,
      attributes: ['full_name', 'email']
    }
  });

  listOfNotifications.forEach(notif => {
    const userEmail = personalizeEmail(emailTemplate, notif.user.fullName);
    const mailOptions = createMailOptions(notif.user.email, userEmail);
    sendEmail(mailOptions);

    notif.set({
      lastSent: new Date(),
      sentHistory: notif.sendHistory.push(new Date())
    });
    notif.save();
  });
};

// Email sender
function sendEmail (mailOptions) {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) console.log(error);
  });
};

// Helper functions for this file
function createMailOptions (customerEmail, template) {
  return {
    from: process.env.EMAIL,
    to: customerEmail,
    subject: template.value.title,
    text: template.value.body
  };
}

async function getSetting (keyToGet) {
  const cacheSettings = getCache('settingsCache');
  let setting = null;

  if (!cacheSettings) {
    setting = await settings.findOne({
      where: { key: keyToGet }
    });
  } else {
    setting = cacheSettings.find(item => item.key === keyToGet);
  }

  return setting;
}

function personalizeEmail (emailTemplate, customerName) {
  const personalEmailTemplate = emailTemplate;
  personalEmailTemplate.value.body = emailTemplate.value.body.replace('customerName', customerName);

  return personalEmailTemplate;
}
