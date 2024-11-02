export interface ILoginType {
    email: string,
    password: string
}


export interface IRegisterType {
    username: string,
    email: string,
    password: string,
    confirm_Password: string
}


export interface IUpdateUser {
    username: string,
    email: string,
    password?: string
}
export interface IUser {
    username?: string,
    email?: string,
    isadmin?: boolean,
}