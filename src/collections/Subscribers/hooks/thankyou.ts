import { BeforeChangeHook } from "payload/dist/collections/config/types";

export const thankyou: BeforeChangeHook = async ({
  data,
  req: { payload },
  operation,
}) => {
  if (operation !== "create") return;

  const { fullname, email } = data;

  try {
    const info = await payload.sendEmail({
      from: process.env.DEFAULT_FROM_EMAIL || "noreply@antonionardini.com",
      to: email,
      subject: "Welcome to ...",
      html: "<p>Thank you for subscribing!</p>",
      // @ts-ignore
      text: "Thank you for subscribing!",
    });

    payload.logger.info(info);
  } catch (err) {
    payload.logger.error("Unable to send email: ", err);
    return err?.response || "Unable to verify email address.";
  }

  return data;
};
