import { CollectionConfig } from "payload/types";
import { isAdmin } from "../../access/isAdmin";
import { isAdminOrEditor } from "../../access/isAdminOrEditor";

const Lists: CollectionConfig = {
  slug: "subscriber-lists",
  labels: {
    singular: "List",
    plural: "Lists",
  },
  access: {
    read: isAdmin,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name"],
  },
  fields: [
    {
      name: "name",
      label: "List Name",
      type: "text",
      required: true,
    },
  ],
}

export default Lists
