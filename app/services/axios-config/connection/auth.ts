import { api } from "..";
import { IAuthProps } from "./types/IAuthProps";

export class AuthService {
    async authenticateWithPassword(data: IAuthProps): Promise<any> {
        return await api.post('/sessions/password', data);
    }
}

export const authService = new AuthService();
