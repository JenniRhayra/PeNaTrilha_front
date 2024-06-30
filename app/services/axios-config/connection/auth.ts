import { api } from "..";
import { IAuthProps, ILoginReturn } from "./types/IAuthProps";

export class AuthService {
    async authenticateWithPassword(data: IAuthProps): Promise<ILoginReturn> {
        const results = await api.post('/sessions/password', data);

        return results.data;
    }
}

export const authService = new AuthService();
