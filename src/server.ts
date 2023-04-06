import aws from "aws-sdk";
import nodemailer from "nodemailer";
import express from 'express';
import payload from 'payload';
import { defaultProvider } from "@aws-sdk/credential-provider-node";

require('dotenv').config();
const app = express();

const awsConfig = {
  apiVersion: "2010-12-01",
  region: process.env.AWS_REGION,
  sslEnabled: false,
  defaultProvider,
};

const ses = new aws.SES(awsConfig);

// Create a Nodemailer transporter
const transport = nodemailer.createTransport({
  SES: {
    ses,
    aws: aws,
  },
});

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
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
    email: {
      fromName: "Payload Marketing",
      fromAddress: "no-reply@antonionardini.com",
      transport,
    },
  });

  // Add your own express routes here

  app.listen(3000);
}

start();
