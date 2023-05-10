import { CollectionConfig } from "payload/types";
import { isAdmin } from "../../access/isAdmin";
import { isAdminOrEditor } from "../../access/isAdminOrEditor";
import { thankyou } from "./hooks/thankyou";

const Subscribers: CollectionConfig = {
    slug: "subscribers",
    labels: {
        singular: "Subscriber",
        plural: "Subscribers",
    },
    access: {
        read: isAdmin,
        create: () => true,
        update: isAdminOrEditor,
        delete: () => true,
    },
    admin: {
        useAsTitle: "fullname",
        defaultColumns: ["fullname", "email"],
    },
    hooks: {
        beforeChange: [thankyou],
    },
    fields: [
        {
            name: "fullname",
            label: "Full Name",
            type: "text",
            required: true,
        },
        {
            name: "email",
            label: "Email Address",
            type: "email",
            required: true,
        },
        {
            name: "lists",
            label: "Lists",
            type: "relationship",
            relationTo: "subscriber-lists",
            hasMany: true,
            required: false,
            admin: {
                position: "sidebar",
            },
        },
    ],
}

export default Subscribers;