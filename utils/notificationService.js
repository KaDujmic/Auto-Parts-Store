const nodemailer = require('nodemailer');
const { getCache } = require('./cache.js');
const { notification } = require('../models');

// Email created on order confirmation
exports.orderConfirmEmail = async function (customerName, customerEmail) {
  const emailKey = 'order_confirmation';
  const emailTemplate = getEmailTemplate(emailKey, customerName, customerEmail);
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
  const emailKey = 'order_arrived';
  const emailTemplate = getEmailTemplate(emailKey, customer.name);
  const mailOptions = createMailOptions(customer.email, emailTemplate);

  sendEmail(mailOptions);
  setUpRecurranceEmail(customer);
};

// Creates a notification table entry for the recurrance email
async function setUpRecurranceEmail (customer) {
  const notificationData = {
    user_id: customer.userID,
    order_id: customer.order_ID,
    name: customer.name,
    status: 'scheduled'
  };
  await notification.create({ notificationData });
}

// Send all customer recurring emails for the day
exports.sendRecurringEmails = async function () {
  // const listOfNotifications = await db.notification.findAll({
  //   where: {
  //     last_sent: {
  //       [db.sequelize.Op.not]: ''
  //     }
  //   }
  // });
};

// Send an email to a customer
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
    subject: template.title,
    text: template.body
  };
}

async function getEmailTemplate (emailKey, customerName) {
  const emailTemplateList = getCache('emailCache');
  let emailTemplate = null;

  if (!emailTemplateList) {
    emailTemplate = await notification.findOne({
      where: { key: emailKey }
    });
  } else {
    emailTemplate = emailTemplateList.find(item => item.key === emailKey);
  }

  emailTemplate.body = emailTemplate.body.replace('customerName', customerName);

  return emailTemplate;
}
