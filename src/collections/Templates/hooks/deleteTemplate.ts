import type { CollectionAfterDeleteHook } from "payload/types";
import {
    DeleteTemplateCommand,
} from "@aws-sdk/client-ses";
import { client as SESClient } from "../../../utilities/client";

const deleteSESTemplate = (templateName) => new DeleteTemplateCommand({ TemplateName: templateName });

export const deleteTemplate: CollectionAfterDeleteHook = async ({
    req: { payload },
    id,
    doc: { name }
}) => {
    const client = SESClient();

    try {
        if (!name) throw new Error("No template name: Unable to delete ses template");

        const cmd = deleteSESTemplate(name);

        const info = await client.send(cmd);

        payload.logger.info(info);

        return;
    } catch (err) {
        payload.logger.error(err);
        return "Unable to delete template.";
    }
}
