export interface ILogin{
    userName:string;
    password:string
}

export interface IRegister extends ILogin{
    name:string;
}

export interface IProfile {
    userName:string;
    name:string;
}
