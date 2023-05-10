import { Access, FieldAccess } from "payload/types";
import { User } from "../payload-types"

export const isDeveloper: Access<any, User> = ({ req: { user } }) => {
    return Boolean(user?.roles?.includes("developer"));
}

export const isDeveloperFieldLevel: FieldAccess<{ id: string }, unknown, User> = ({ req: { user } }) => {
    return Boolean(user?.roles?.includes("developer"));
}