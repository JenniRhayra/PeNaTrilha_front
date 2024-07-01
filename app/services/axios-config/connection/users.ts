import { api } from "..";
import { ICreateUser } from "./types/ICreateUser";
import { User } from "./types/IListManyParksInfo";

export class UsersService {
    async createUser(data: ICreateUser): Promise<any> {
        const response = await api.post('/user/create-user', data);

        return response.data;
    }

    async findParkVisit(parkId: number, email: string): Promise<any> {
        const response = await api.get(`/user/find-park-visit/${parkId}/${email}`);

        return response;
    }

    async getUserProfile(userId: number): Promise<User> {
        return await api.get(`/user/get-user-profile/${userId}`);
    }

    async inativeUser(userId: number): Promise<void> {
        return await api.put(`/user/inative-user/${userId}`);
    }

    async listParkVisit(userId: number): Promise<any> {
        const response = await api.get(`/user/list-park-visit/${userId}`);

        return response;
    }

    async updateParkVisit(parkId: number, email: string): Promise<void> {
        await api.put(`/user/update-park-visit/${parkId}/${email}`);
    }
}

export const usersService = new UsersService();
