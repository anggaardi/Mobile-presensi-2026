import {httpClient} from '../http';
import type {LoginRequest, LoginResponse,LogoutResponse, GetMeResponse } from './type';


class AuthService {
    async login(credential:LoginRequest):Promise<LoginResponse>{
        return httpClient.post<LoginResponse>('/auth/login', credential);
    }
    async logout():Promise<LogoutResponse>{
        return httpClient.post<LogoutResponse>('/auth/logout');
    }
    async getMe():Promise<GetMeResponse>{
        return httpClient.post<GetMeResponse>('/auth/me');
    }   
}

export const authService = new AuthService();   
export * from './type';

