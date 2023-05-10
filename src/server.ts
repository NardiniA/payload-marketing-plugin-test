import express from 'express';
import payload from 'payload';

require('dotenv').config();
const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
    email: {
      fromName: "Payload Marketing",
      fromAddress: process.env.DEFAULT_FROM_EMAIL || "noreply@antonionardini.com",
      transportOptions: {
        host: process.env.SMTP_HOST as string,
        port: +process.env.SMTP_PORT || 587,
        auth: {
          user: process.env.SMTP_USER as string,
          pass: process.env.SMTP_PASS as string,
        },
      },
    },
  });

  // Add your own express routes here

  app.listen(3000);
}

start();
