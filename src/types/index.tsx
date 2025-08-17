export interface IUser {
    id?:number;
    full_name:string;
    username:string;
    email:string;
    phone_number:string;
    password:string;
    confirm_password?:string;
    gender:string
}