import { CollectionConfig } from 'payload/types';
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrEditor } from '../access/isAdminOrEditor';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "firstname", "lastname"],
    group: "Admin",
  },
  access: {
    create: isAdmin,
    update: isAdminOrEditor,
    read: () => true,
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "firstname",
          label: "First Name",
          type: "text",
          required: true,
          admin: {
            width: "50%",
          },
        },
        {
          name: "lastname",
          label: "Last Name",
          type: "text",
          required: true,
          admin: {
            width: "50%",
          },
        },
      ],
    },
    {
      name: "roles",
      label: "Roles",
      type: "select",
      options: [
        {
          label: "Editor",
          value: "editor",
        },
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Developer",
          value: "developer",
        },
      ],
      defaultValue: "editor",
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      required: true,
    },
  ],
};

export default Users;