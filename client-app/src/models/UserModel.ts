export interface IUser {
    userName: string;
    displayName: string;
    token: string;
    isAdmin: boolean;
    email: string;
}

export interface IUserFromValues {
    email?: string;
    password: string;
    displayName?: string;
    userName: string;
    isAdmin?: boolean;
}