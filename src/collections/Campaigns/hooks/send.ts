import type { BeforeChangeHook } from "payload/dist/collections/config/types";

export const send: BeforeChangeHook = async ({ data, req: { payload }, operation }) => {
  // Only run when creating campaign
  if (operation !== "create") return;

  // Init targets
  let targets = [];

  payload.logger.info(data);

  if (data?.type === "lists") {
    try {
      // Retrieve subscribers
      const {docs} = await payload.find({
        // @ts-ignore
        collection: "subscribers",
        where: {
          lists: {
            in: data?.lists?.lists,
          },
        },
      });

      payload.logger.info(docs);

      // Check if we have emails to send to
      if (!docs?.length) return "No documents found.";

      // Assign to targets
      targets = docs;
    } catch (e) {
      payload.logger.error("Cannot get subscribers from lists: ", e);
      return;
    }
  } else if (data?.type === "individual") {
    payload.logger.info(data?.individuals);
    // If individuals assign directly to targets
    targets = data?.individuals;
  }

  if (!targets?.length) return "No email addresses found.";

  // Send Emails
  // ...

  return;
};