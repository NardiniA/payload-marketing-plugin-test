import type { CollectionBeforeChangeHook } from "payload/types";
import { client as SESClient } from "../../../utilities/client";
import {
  CreateTemplateCommand,
  UpdateTemplateCommand,
} from "@aws-sdk/client-ses";

const createSESTemplate = (data) => {
  return new CreateTemplateCommand({
    Template: {
      TemplateName: data?.name,
      SubjectPart: data?.subject,
      HtmlPart: data?.html,
      TextPart: data?.text,
    }
  });
}

const updateSESTemplate = (data) => {
  return new UpdateTemplateCommand({
    Template: {
      TemplateName: data?.name,
      SubjectPart: data?.subject,
      HtmlPart: data?.html,
      TextPart: data?.text,
    },
  });
}

export const createTemplate: CollectionBeforeChangeHook = async ({
  data,
  req: { payload },
  operation,
}) => {
  const client = SESClient();

  let cmd;
  
  if (operation === "create") cmd = createSESTemplate(data);
  else cmd = updateSESTemplate(data);

  try {
    const info = await client.send(cmd);

    payload.logger.info(info);

    return data;
  } catch (err) {
    payload.logger.error(err);
    return "Unable to create template.";
  }
}
