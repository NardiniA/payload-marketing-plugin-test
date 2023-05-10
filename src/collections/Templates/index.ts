import type { CollectionConfig } from "payload/types";
import { isAdminOrEditor } from "../../access/isAdminOrEditor";
import { isAdmin } from "../../access/isAdmin";
import { createTemplate } from "./hooks/createTemplate";

const Templates: CollectionConfig = {
  slug: "templates",
  labels: {
    singular: "Template",
    plural: "Templates",
  },
  access: {
    read: isAdminOrEditor,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "text"],
  },
  hooks: {
    beforeChange: [
      createTemplate
    ]
  },
  fields: [
    {
      name: "name",
      label: "Template Name",
      type: "text",
      unique: true,
      required: true,
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      admin: {
        description:
          "This is the Subject for the email. Use `{{` `}}` with a name in the middle to pass in data to the template. (i.e. `{{subject}}`)",
      },
      defaultValue: "{{subject}}",
      required: true,
    },
    {
      name: "html",
      label: "HTML",
      type: "code",
      admin: {
        language: "html",
        description:
          "This is the HTML content for the email. Use `{{` `}}` with a name in the middle to pass in data to the template. (i.e. `{{name}}`)",
      },
      required: true,
    },
    {
      name: "text",
      label: "Text Part",
      type: "textarea",
      admin: {
        description:
          "The backup for if the html doesn't load. This is the HTML content for the email. Use `{{` `}}` with a name in the middle to pass in data to the template. (i.e. `{{name}}`)",
      },
      required: true,
    },
  ],
};

export default Templates
