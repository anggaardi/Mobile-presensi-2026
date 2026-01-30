export interface LoginRequest{
    email: string;
    password:string;
}

export interface User{
    id:number
    name:string
    email:string
    phone:string
    employeeId:string
    role:string
    email_verified_at?:string
    created_at:string
}


export interface LoginResponse{
    success: boolean
    message:string
    data:{
        user:User
        access_token:string
    }
}

export interface LogoutResponse{
    success: boolean
    message:string
}

export interface GetMeResponse{
    success: boolean
    message:string
    data:User
}