import { api } from "..";
import { ICreateUser } from "./types/ICreateUser";

export class UsersService {
    async createUser(data: ICreateUser): Promise<any> {
        const response = await api.post('/user/create-user', data);

        return response.data;
    }
}

export const usersService = new UsersService();
