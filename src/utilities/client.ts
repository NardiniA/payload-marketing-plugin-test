import * as AWS from "@aws-sdk/client-ses";

export const client = () => {
  const ses = new AWS.SES({
    region: "eu-west-2"
  });

  if (!ses) throw new Error("Cannot init SESClient");

  return ses;
};
