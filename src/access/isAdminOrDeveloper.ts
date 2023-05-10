import { Access } from "payload/config";

export const isAdminOrDeveloper: Access = ({ req: { user } }) => {
  // Is there a logged in user and are they an admin or developer
  if (user) {
    if (user?.roles?.includes("admin") || user?.roles?.includes("developer"))
      return true;
  }

  // Reject others
  return false;
};
