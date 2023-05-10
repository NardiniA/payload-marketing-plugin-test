import type { CollectionConfig } from "payload/types";
import { isAdmin } from "../../access/isAdmin";
import { send } from "./hooks/send";

const Campaigns: CollectionConfig = {
  slug: "campaigns",
  labels: {
    singular: "Campaign",
    plural: "Campaigns",
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: () => false,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name"],
  },
  hooks: {
    beforeChange: [send]
  },
  fields: [
    {
      name: "name",
      label: "Campaign Name",
      type: "text",
      required: true,
    },
    {
      name: "type",
      label: "Targets",
      type: "radio",
      options: [
        {
          label: "Lists",
          value: "lists",
        },
        {
          label: "Individual",
          value: "individual",
        },
      ],
      defaultValue: "lists",
      admin: {
        layout: "horizontal",
      },
    },
    {
      name: "lists",
      label: "Lists",
      type: "group",
      fields: [
        {
          name: "lists",
          label: false,
          type: "relationship",
          relationTo: "subscriber-lists",
          hasMany: true,
          required: true,
        },
      ],
      admin: {
        condition: (_, { type }) => type === "lists",
      },
    },
    {
      name: "individuals",
      label: "Subscribers",
      type: "group",
      fields: [
        {
          name: "subscribers",
          label: false,
          type: "relationship",
          relationTo: "subscribers",
          hasMany: true,
          required: true,
        },
      ],
      admin: {
        condition: (_, { type }) => type === "individual",
      },
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      required: true,
    },
    {
      name: "body",
      label: "Body",
      type: "richText",
      required: true,
    },
  ],
};

export default Campaigns;
