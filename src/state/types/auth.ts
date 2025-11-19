
export type Role = "COSTUMER" | "ARTIST" | "ADMIN";

export interface LoggedInUser {
    id: number;
    name: string;
    email: string;
    role: Role;
}
