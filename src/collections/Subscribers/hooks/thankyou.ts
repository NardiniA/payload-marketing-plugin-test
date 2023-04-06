import { AfterChangeHook } from "payload/dist/collections/config/types";

export const thankyou: AfterChangeHook = async ({
    doc,
    req: { payload },
    operation,
}) => {
    if (operation !== "create") return;

    const { fullname, email } = doc;

    if (!(fullname && email)) return;

    await payload.sendEmail({
        from: "no-reply@antonionardini.com",
        to: email,
        subject: "Welcome to ...",
        html: "Thank you for subscribing!",
    });

    return;
}