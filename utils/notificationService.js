const nodemailer = require('nodemailer');
const { getCache } = require('./cache.js');
const { user, order, notification, settings, Sequelize, sequelize } = require('../models');

// Email created on order confirmation
exports.orderConfirmEmail = async function (customerId) {
  const customer = await user.findOne({ where: { id: customerId } });

  let emailTemplate = await getSetting('order_confirmation_template');
  emailTemplate = personalizeEmail(customer.name, emailTemplate);

  const mailOptions = createMailOptions(customer.email, emailTemplate);
  sendEmail(mailOptions);
};

exports.orderArrivedEmail = async function (orderId) {
  const customer = await order.findOne({
    where: {
      id: orderId
    },
    include: [user],
    attributes: ['user.id', 'user.full_name', 'user.email']
  });

  let emailTemplate = await getSetting('order_arrived_template');
  emailTemplate = personalizeEmail(customer.user.fullName, emailTemplate);

  const mailOptions = createMailOptions(customer.user.email, emailTemplate);
  sendEmail(mailOptions);

  setUpRecurrenceEmail(customer.user.id, orderId);
};

// Creates a notification table entry for the recurrence email
async function setUpRecurrenceEmail (userId, orderId) {
  await notification.create(
    {
      userId,
      orderId,
      lastSent: new Date().toISOString().split('T')[0]
    });
}

// Send all recurring emails for the day
exports.sendRecurringEmails = async function () {
  const emailTemplate = await getSetting('order_pickup_template');
  const recurrenceSetting = await getSetting('order_pickup_recurrence');

  let date = new Date();
  date.setDate(date.getDate() - recurrenceSetting.value.recurrence);
  date = date.toISOString().split('T')[0];

  const listOfNotifications = await notification.findAll({
    where: {
      last_sent: {
        [Sequelize.Op.lte]: date
      },
      deleted: false
    },
    include: {
      model: user,
      attributes: ['full_name', 'email']
    }
  });

  listOfNotifications.forEach(notif => {
    const userEmail = personalizeEmail(notif.user.fullName, emailTemplate);
    const mailOptions = createMailOptions(notif.user.email, userEmail);
    sendEmail(mailOptions);

    const todaysDate = new Date().toISOString().split('T')[0];
    notif.set({
      lastSent: new Date().toISOString().split('T')[0],
      sentHistory: sequelize.fn('array_append', sequelize.col('sent_history'), todaysDate)
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
  const cacheSettings = getCache('settings');
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

function personalizeEmail (customerName, emailTemplate) {
  const personalEmailTemplate = emailTemplate;
  personalEmailTemplate.value.body = emailTemplate.value.body.replace('customerName', customerName);

  return personalEmailTemplate;
}
